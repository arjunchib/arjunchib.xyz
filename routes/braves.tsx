import BravesRadioLocator from "../islands/BravesRadioLocator.tsx";
import { Page } from "../components/Page.tsx";

export default function Braves() {
  return (
    <Page title="Braves Radio" icon="📻">
      <BravesRadioLocator></BravesRadioLocator>
    </Page>
  );
}
