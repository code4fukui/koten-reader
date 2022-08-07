import { parseText } from "./parseText.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

//const fn = "3804_27277.html";
const url = Deno.args[0] || "https://www.aozora.gr.jp/cards/001395/files/49897_42649.html"; // 創作
//const fn = "92_14545.html";
//const bin = await Deno.readFile("data/" + fn);
const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
const html = SJIS.decode(bin);
const text = parseText(html);
console.log(text);
