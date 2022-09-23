import { useComputed, useSignal } from "@preact/signals";
import radioNetworks from "../static/radio-networks.json" assert {
  type: "json",
};
import { useEffect } from "preact/hooks";

type Network = typeof radioNetworks[0];

const blankNetwork: Network = {
  state: "",
  city: "",
  station: "",
  frequency: "",
  dma: "",
  coordinates: [0, 0],
};

export default function BravesRadioLocator() {
  const networks = useSignal<Network[]>(Array(20).fill(blankNetwork));
  const coord = useSignal<[number, number] | undefined>(undefined);

  const success = (pos: GeolocationPosition) => {
    coord.value = [pos.coords.latitude, pos.coords.longitude];
    networks.value = [...radioNetworks.sort((a, z) => {
      const coordA = a.coordinates as [number, number];
      const coordZ = z.coordinates as [number, number];
      return distance(coordA, coord.value!) - distance(coordZ, coord.value!);
    })];
  };

  const error = (err: GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const rows = useComputed(() => {
    return networks.value?.slice(0, 20).map((n) => {
      return (
        <tr class="odd:dark:bg-gray-900 rounded h-4">
          <td class="py-1 px-2 rounded-l h-8 box-content">{n.state}</td>
          <td>{n.city}</td>
          <td>{n.station}</td>
          <td class="rounded-r">{n.frequency}</td>
        </tr>
      );
    });
  });

  return (
    <div class="mt-3">
      <div
        class="w-full dark:bg-gray-900 rounded -mx-2 py-2 text-center font-mono text-xl font-bold h-12"
        style="width: calc(100% + 1rem)"
      >
        {networks.value?.[0].frequency}
      </div>
      <table
        class="mt-4 border-collapse -mx-2"
        style="width: calc(100% + 1rem)"
      >
        {rows.value}
      </table>
    </div>
  );
}

function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}
