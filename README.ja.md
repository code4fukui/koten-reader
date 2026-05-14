# koten-reader

青空文庫の日本の古典文学を朗読する、macOS用のコマンドラインツールです。

## デモ

Web Speech APIを使用してテキストを読み上げる、シンプルなブラウザ版も利用可能です。

https://code4fukui.github.io/koten-reader/

## 機能

- macOS標準の `say` コマンドを使用して本を朗読します。
- [青空文庫](https://www.aozora.gr.jp/)のHTMLをパースし、クリーンで読みやすいテキストを抽出します。
- さまざまなシステムボイス（例: 男声のOtoya、女声のKyoko）や読み上げ速度に対応しています。
- 本のテキストから直接音声ファイルを生成できます。
- 青空文庫のカタログからランダムに選んだ本、またはURLで指定した特定の本を読み上げます。

## 必要条件

- [Deno](https://deno.land/)

## 使い方

### ランダムに10冊の本を朗読する（Otoyaボイス）

スクリプトがランダムに10冊の本を取得してパースし、そのテキストを `say` コマンドにパイプします。

```bash
deno run -A show10.js | say -v Otoya
```

### ランダムに1冊の本を朗読する（Kyokoボイス、早口）

引数として本の数を指定します。ここでは、1分間に300語の速度で1冊の本を読み上げます。

```bash
deno run -A show10.js 1 | say -v Kyoko -r 300
```

### ランダムに20冊の本の音声ファイルを生成する

`say` コマンドの `-o` フラグを使用して、出力を音声ファイルとして保存します。

```bash
deno run -A show10.js 20 | say -v Otoya -o book20.aac
```

### URLから特定の1冊を朗読する

`test.js` を使用して、指定した青空文庫のURLから本をパースして読み上げます。

```bash
deno run -A test.js "https://www.aozora.gr.jp/cards/000879/files/43014_17430.html" | say -v Otoya
```

## データ

このプロジェクトでは、公式の青空文庫のカタログリストを使用しています。

- [list_person_all_extended_utf8.csv](list_person_all_extended_utf8.csv) - [公開中　作家リスト：全て](https://www.aozora.gr.jp/index_pages/person_all.html) に掲載されている18,537作品のリスト。

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
