import { Page } from "../components/Page.tsx";

export default function Home() {
  return (
    <Page title="Arjun’s World" icon="🌌" back={false}>
      <nav class="my-3 pl-5">
        <ul class="list-disc">
          <li>
            <a href="/pizza">
              <span class="underline">Pizza</span> 🍕
            </a>
          </li>
          <li>
            <a href="/braves">
              <span class="underline">Braves Radio</span> 📻
            </a>
          </li>
        </ul>
      </nav>
    </Page>
  );
}
