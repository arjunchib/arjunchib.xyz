import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { ChevronLeft } from "./icons/chevron-left.tsx";

interface PageProps {
  title: string;
  icon: string;
  back?: boolean;
  children: JSX.Element | JSX.Element[];
}

export function Page(props: PageProps) {
  let { back, icon } = props;
  if (back === undefined) back = true;

  const backBtn = (
    <a
      href="./"
      className="flex items-center text-xs -ml-2 dark:text-gray-400"
    >
      <ChevronLeft /> Back
    </a>
  );
  const welcomeText = (
    <span className="flex items-center text-xs dark:text-gray-400">
      Welcome to
    </span>
  );
  const header = back ? backBtn : welcomeText;
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
      <main class="bg-cover bg-fixed dark:bg-[linear-gradient(rgba(31,41,55,0.66),rgba(31,41,55,0.99)),url('bg.svg')] dark:text-white min-h-[100dvh] p-5 pt-3">
        {header}
        <h1 class="font-serif text-2xl font-bold">
          {props.title} {props.icon}
        </h1>
        {props.children}
      </main>
    </>
  );
}
