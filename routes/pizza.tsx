import PizzaCalculator from "../islands/PizzaCalculator.tsx";
import { Page } from "../components/Page.tsx";

export default function Pizza() {
  return (
    <Page title="Pizza" icon="🍕">
      <PizzaCalculator></PizzaCalculator>
    </Page>
  );
}
