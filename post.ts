import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";

export interface Post {
  slug: string;
  title: string;
  emoji: string;
  publishedAt: Date;
  content: string;
}

export async function getPosts(path: string): Promise<Post[]> {
  const files = Deno.readDir(path);
  const promises = [];
  for await (const file of files) {
    const isMarkdown = file.isFile && file.name.endsWith(".md");
    if (isMarkdown) promises.push(getPost(path, file.name));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

export async function getPost(dir: string, file: string): Promise<Post | null> {
  const slug = file.replace(".md", "");
  const text = await Deno.readTextFile(join(dir, `${slug}.md`));
  const { attrs, body } = extract<Omit<Post, "content" | "slug">>(text);
  return {
    ...attrs,
    slug,
    publishedAt: new Date(attrs.publishedAt),
    content: body,
  };
}
