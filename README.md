# 古典リーダー for Mac

Macにて[青空文庫](https://www.aozora.gr.jp/)の書籍を読み上げるツールです

## Webアプリ

- https://code4fukui.github.io/koten-reader/

## サンプル

- [kumotoito.aac](https://code4fukui.github.io/koten-reader/sample/kumonoito.aac) - [蜘蛛の糸 by 芥川龍之介](https://www.aozora.gr.jp/cards/000879/files/92_14545.html)
- [akuma.aac](https://code4fukui.github.io/koten-reader/sample/akuma.aac) - [悪魔 by 芥川龍之介](https://www.aozora.gr.jp/cards/000879/files/3804_27277.html)

## 使い方(Mac)

Macのsayコマンドを使って10冊読み上げる(音声は男性声Otoyaを使用)
```
deno run -A show10.js | say -v Otoya
```
* [Deno](https://deno.land/)をインストール
* Otoya は、システム環境設定、アクセシビリティ、読み上げコンテンツ、システムの声、カスタマイズ、日本語の中から選択してインストール

Macのsayコマンドを使って1冊読み上げる（音声は女性声Kyokoを使用、少し早め -r 300）
```
deno run -A show10.js 1 | say -v Kyoko -r 300
```

Macのsayコマンドを使って20冊分音声ファイルを生成する
```
deno run -A show10.js 20 | say -v Otoya -o book10.aac
```

URLを指定して1冊読み上げる
```
deno run -A test.js "https://www.aozora.gr.jp/cards/000879/files/43014_17430.html" | say -v Otoya
```

## リスト

- [list_person_all_extended_utf8.csv](list_person_all_extended_utf8.csv) - 18,537冊分 ([公開中　作家リスト：全て](https://www.aozora.gr.jp/index_pages/person_all.html)より)
