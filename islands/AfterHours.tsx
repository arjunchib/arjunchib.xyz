import { IS_BROWSER } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { isAfterHours } from "../utils.ts";

interface Props {
  children: ComponentChildren;
}

export default function AfterHours({ children }: Props) {
  return IS_BROWSER && isAfterHours() ? <>{children}</> : <></>;
}
