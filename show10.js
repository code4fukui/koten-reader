import { parseText } from "./parseText.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { shuffle } from "https://js.sabae.cc/shuffle.js";
import { DOMParser } from "https://js.sabae.cc/DOMParser.js";

const len = parseInt(Deno.args[0]) || 10;

const listfn = "list_person_all_extended_utf8.csv";
const list = CSV.toJSON(await CSV.fetch(listfn));
shuffle(list);

let idx = 0;
for (let i = 0; i < len; i++) {
  const item = list[idx++];
  if (item["文字遣い種別"] != "新字新仮名") {
    i--;
    continue;
  }
  const url = item["XHTML/HTMLファイルURL"];
  const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
  const html = SJIS.decode(bin);
  const text = parseText(DOMParser, html);
  console.log(text);
  console.error(item["作品名"] + " by " + item["姓"] + " " + item["名"]);
  console.error(url);
}
