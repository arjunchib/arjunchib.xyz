#!/usr/bin/env -S deno run -A

import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const textResponse = await fetch(
  "https://www.mlb.com/braves/schedule/radio-affiliates",
);
const textData = await textResponse.text();

const doc = new DOMParser().parseFromString(textData, "text/html")!;

const tbody = doc.querySelector("tbody")!;

const cols = ["state", "city", "station", "frequency", "dma"];

const data = [...tbody.children].map((tr) => {
  const record: Record<string, string> = {};
  cols.forEach((c, i) => {
    record[c] = tr.children[i].textContent;
  });
  return record;
});

const networks = data.map(async (record, i) => {
  await sleep(i * 100);

  const params = new URLSearchParams({
    key: "ArKfyc_OenEiVDKQ6lFQsHP7oiiglUbLP5pxsA83V-o46lphFWZjVf9uhWlsQ1lK",
    query: `${record["city"]}, ${record["state"]}`,
  }).toString();

  const res = await fetch(
    `http://dev.virtualearth.net/REST/v1/Locations?${params}`,
  );

  if (res.headers.get("X-MS-BM-WS-INFO") === "1") {
    console.log("rate limit");
  }

  const maps = await res.json();

  return {
    ...record,
    coordinates: maps.resourceSets[0].resources[0].point.coordinates,
  };
});

const file = new URL("../static/radio-networks.json", import.meta.url).pathname;
Deno.writeTextFileSync(
  file,
  JSON.stringify(await Promise.all(networks), null, 2),
);

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
