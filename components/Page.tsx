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
  let back = <></>;
  if (props.back !== false) {
    back = (
      <a
        href="../"
        className="flex items-center text-xs -ml-2 dark:text-gray-400"
      >
        <ChevronLeft /> Back
      </a>
    );
  }
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
        {back}
        <h1 class="font-serif text-2xl font-bold">
          {props.title} {props.icon}
        </h1>
        {props.children}
      </main>
    </>
  );
}
