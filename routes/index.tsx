import { Page } from "../components/Page.tsx";

export default function Home() {
  return (
    <Page title="Arjun’s World" icon="🌌">
      <nav class="my-3 pl-5">
        <ul class="list-disc">
          <li>
            <a href="/pizza">
              <span class="underline">Pizza</span> 🍕
            </a>
          </li>
        </ul>
      </nav>
    </Page>
  );
}
