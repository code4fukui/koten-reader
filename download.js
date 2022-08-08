import { CSV } from "https://js.sabae.cc/CSV.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const existsFile = async (fn) => {
  try {
    const s = await Deno.readFile(fn);
    return true;
  } catch (e) {
  }
  return false;
};

const url = "list_person_all_extended_utf8.csv";
const data = CSV.toJSON(await CSV.fetch(url));
//console.log(data[0]);
for (const d of data) {
  const url2 = d["XHTML/HTMLファイルURL"];
  if (!url2.startsWith("https://www.aozora.gr.jp/cards/")) {
    console.log(url2, "skip", d["作品名"]);
    continue;
  }
  const fn = "data/" + url2.substring(url2.lastIndexOf("/") + 1);
  if (await existsFile(fn)) {
    console.log("skip", d["作品名"]);
    continue;
  }
  const bin = new Uint8Array(await (await fetch(url2)).arrayBuffer());
  const txt = SJIS.decode(bin);
  //console.log(txt);
  const utf8 = txt.replace(/Shift_JIS/g, "utf-8")
  await Deno.writeTextFile(fn, utf8);
  console.log(fn, d["作品名"]);
  await sleep(100);
}
