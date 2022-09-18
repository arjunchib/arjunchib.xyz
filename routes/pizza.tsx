import PizzaCalculator from "../islands/PizzaCalculator.tsx";

export default function Pizza() {
  return (
    <div class="dark:bg-gray-800 dark:text-white min-h-screen p-5">
      <h1 class="font-serif text-2xl font-bold">Pizza 🍕</h1>
      <PizzaCalculator></PizzaCalculator>
    </div>
  );
}
