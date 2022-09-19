import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";

interface PageProps {
  title: string;
  icon: string;
  children: JSX.Element;
}

export function Page(props: PageProps) {
  const icon = `/favicon?icon=${props.icon}`;
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={icon}
        />
        <title>{props.title}</title>
      </Head>
      <main class="dark:bg-gray-800 dark:text-white min-h-screen p-5">
        <h1 class="font-serif text-2xl font-bold">
          {props.title} {props.icon}
        </h1>
        {props.children}
      </main>
    </>
  );
}
