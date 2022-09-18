import { useComputed, useSignal } from "@preact/signals";
import { round } from "../utils.ts";

const baseIngredients = {
  flour: 151.75,
  "boiling water": (91 / 3),
  "cold water": (182 / 3),
  salt: 4.5,
  "active dry yeast": 5,
};

export default function PizzaCalculator() {
  const pizzas = useSignal(1);

  const onInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    pizzas.value = parseInt(value);
  };

  const table = useComputed(() => {
    return Object.entries(baseIngredients).map(([k, v]) => {
      return (
        <tr class="odd:dark:bg-gray-900 rounded">
          <th class="text-left py-1 px-2 rounded-l" scope="row">{k}</th>
          <td class="text-right py-1 px-2 rounded-r">
            {round(v * pizzas.value)}g
          </td>
        </tr>
      );
    });
  });

  return (
    <div class="mt-3">
      <div class="flex items-center justify-between">
        Number of pizzas:
        <input
          class="rounded float-right dark:bg-gray-900 px-2 py-1 w-20"
          type="number"
          inputMode="numeric"
          value={pizzas.value}
          onInput={onInput}
          min="1"
        >
        </input>
      </div>
      <table
        class="mt-4 border-collapse -mx-2"
        style="width: calc(100% + 1rem)"
      >
        {table.value}
      </table>
    </div>
  );
}
