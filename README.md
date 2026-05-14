# koten-reader

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A command-line tool for macOS to read aloud classic Japanese literature from Aozora Bunko.

## Demo

A simple, browser-based version is also available, which uses the Web Speech API for text-to-speech.

https://code4fukui.github.io/koten-reader/

## Features

-   Reads books aloud using the native macOS `say` command.
-   Parses HTML from [Aozora Bunko](https://www.aozora.gr.jp/) to extract clean, readable text.
-   Supports different system voices (e.g., male voice Otoya, female voice Kyoko) and reading speeds.
-   Can generate audio files directly from the book text.
-   Reads a random selection of books from the Aozora Bunko catalog or a specific book by URL.

## Requirements

-   [Deno](https://deno.land/)

## Usage

### Read 10 random books aloud (Otoya voice)

The script fetches and parses 10 random books, then pipes the text to the `say` command.

```bash
deno run -A show10.js | say -v Otoya
```

### Read 1 random book aloud (Kyoko voice, faster)

Specify the number of books as an argument. Here, we read one book at a rate of 300 words per minute.

```bash
deno run -A show10.js 1 | say -v Kyoko -r 300
```

### Generate an audio file for 20 random books

Use the `say` command's `-o` flag to save the output as an audio file.

```bash
deno run -A show10.js 20 | say -v Otoya -o book20.aac
```

### Read one specific book from a URL

Use `test.js` to parse and read a book from a given Aozora Bunko URL.

```bash
deno run -A test.js "https://www.aozora.gr.jp/cards/000879/files/43014_17430.html" | say -v Otoya
```

## Data

This project uses the official Aozora Bunko catalog list.

-   [list_person_all_extended_utf8.csv](list_person_all_extended_utf8.csv) - A list of 18,537 works from [公開中　作家リスト：全て](https://www.aozora.gr.jp/index_pages/person_all.html).

## License

MIT License — see [LICENSE](LICENSE).