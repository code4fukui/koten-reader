import { DOMParser } from "https://js.sabae.cc/DOMParser.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

export const parseText = (html) => {
  //const kanji = true;
  const kanji = false;
  const kotencnv = false;


  const dom = new DOMParser().parseFromString(html, "text/html");
  const title = dom.querySelector(".title")?.textContent;
  const author = dom.querySelector(".author").textContent;
  const translator = dom.querySelector(".translator")?.textContent;
  const main = dom.querySelector(".main_text");
  const ss = [];

  const parse = (div) => {
    for (const tag of div.childNodes) {
      //console.log(tag.tagName);
      if (tag.tagName == "DIV") {
        parse(tag);
      } else if (tag.tagName == "RUBY") {
        for (const tag2 of tag.childNodes) {
          //console.log(tag2.tagName, tag2.textContent, (!kanji && (tag2.tagName == "RP" || tag2.tagName == "RB")));
          if (kanji && (tag2.tagName == "RP" || tag2.tagName == "RT")) {
            continue;
          }
          if (!kanji && (tag2.tagName == "RP" || tag2.tagName == "RB")) {
            continue;
          }
          ss.push(tag2.textContent);
        }
      } else {
        ss.push(tag.textContent);
      }
    }
  };
  parse(main);

  const koten2gendai = (s) => {
    s = s.replace(/さう/g, "そう");
    s = s.replace(/あらう/g, "あろう");
    s = s.replace(/云ふ/g, "言う");
    s = s.replace(/云ひ/g, "言い");
    s = s.replace(/云つて/g, "言って");
    s = s.replace(/云/g, "言");
    s = s.replace(/疑ふ/g, "疑う");
    s = s.replace(/さへ/g, "さえ");
    s = s.replace(/ゆふべ/g, "ゆうべ");
    s = s.replace(/やう/g, "よう");
    s = s.replace(/姫君/g, "ひめぎみ");
    s = s.replace(/とつては/g, "とっては");
    s = s.replace(/思つた/g, "思った");
    s = s.replace(/思ひました/g, "思いました");
    s = s.replace(/乗つていた/g, "乗っていた");
    s = s.replace(/あひだ/g, "あいだ");
    s = s.replace(/せう/g, "しょう");
    s = s.replace(/あじはふ/g, "あじあう");
    s = s.replace(/憐んでくれ/g, "あわれんでくれ");
    return s;
  };

  const ss2 = ss.join("").replace(/\n/g, "。");
  const text = kotencnv ? koten2gendai(ss2) : ss2;

  const res = [];
  res.push(title ? title + "。" : "");
  res.push(author + "。");
  res.push(translator ? translator + "。" : "");
  res.push(text);
  return res.join("\n");
};
