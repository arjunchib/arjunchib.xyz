import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { ChevronLeft } from "./icons/chevron-left.tsx";

interface PageProps {
  title: string;
  icon: string;
  back?: boolean;
  children: JSX.Element;
}

export function Page(props: PageProps) {
  let { back, icon } = props;
  if (back === undefined) back = true;
  const favicon = `/favicon?icon=${icon}`;
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={favicon}
        />
        <title>{props.title}</title>
      </Head>
      <main class="dark:bg-gray-800 dark:text-white min-h-[100dvh] p-5 pt-3">
        <a
          style={{ visibility: back ? "visible" : "hidden" }}
          aria-hidden={!back}
          href="./"
          className="flex items-center text-xs -ml-2 dark:text-gray-400"
        >
          <ChevronLeft /> Back
        </a>
        <h1 class="font-serif text-2xl font-bold">
          {props.title} {props.icon}
        </h1>
        {props.children}
      </main>
    </>
  );
}
