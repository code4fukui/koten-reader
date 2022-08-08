import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const url = "list_person_all_extended_utf8.csv";
const data = CSV.toJSON(await CSV.fetch(url));
const list = [];
const aozora = [];
console.log(ArrayUtil.toUnique(data.map(d => d["作品ID"])).length); // 17,113作品
//console.log(data[0]);
const chk = {};
for (const d of data) {
  const url2 = d["XHTML/HTMLファイルURL"];
  /* // 作品IDに重複あり、著作者と翻訳者など、複数レコードある
  if (chk[url2]) {
    console.log("!!", chk[url2], d);
    Deno.exit();
  }
  chk[url2] = d;
  */

  if (!url2.startsWith("https://www.aozora.gr.jp/cards/")) {
    //console.log(url2, "skip", d["作品名"]);
    list.push(d);
    continue;
  }
  const enc = d["XHTML/HTMLファイル符号化方式"];
  if (enc != "ShiftJIS") {
    console.log(d["作品名"]); // 青空文庫内はすべてShiftJISだった
  }
  aozora.push(d);
}
await Deno.writeTextFile("list_not_aozora.csv", CSV.stringify(list));
await Deno.writeTextFile("list_aozora.csv", CSV.stringify(aozora));
console.log(aozora.length, list.length, aozora.length + list.length);
