import { Page } from "../components/Page.tsx";

export default function Obsidian() {
  return (
    <Page title="Obsidian" icon="🪨">
      <iframe
        src="https://publish.obsidian.md/arjun"
        frameborder="0"
        class="mt-2 w-full h-[calc(100vh-90px)] border-indigo-600 border-8"
        style={{ borderStyle: "ridge" }}
      >
      </iframe>
    </Page>
  );
}
