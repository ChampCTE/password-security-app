# Password Security App

A password security web application built with Next.js, TypeScript, and Tailwind CSS. It allows users to analyze password strength and generate secure passwords with options for uppercase, lowercase, numbers, and symbols.

## Deployment

Deploy to Vercel for the easiest setup.

- Vercel URL: _pending deploy_

## Description

This app offers:

- Password analyzer with a strength score and estimated crack time.
- Customizable password generator.
- Light and dark mode.
- Language selection with support for multiple translations.
- Internal Next.js API routes (`app/api`).

## Project structure

- `app/`
  - `layout.tsx` — root layout and global metadata (`title`, `description`).
  - `page.tsx` — main page containing the analyzer and generator.
  - `api/analyze/route.ts` — API route for password analysis.
  - `api/generate/route.ts` — API route for password generation.
  - `globals.css` — global CSS styles.
- `components/`
  - `passwordAnalyzer.tsx` — password analysis component.
  - `passwordGenerator.tsx` — password generator component.
- `services/`
  - `passwordAnalyzer.ts` — client for calling the analysis API.
  - `passwordGenerator.ts` — client for calling the generation API.
- `types/`
  - `password.ts` — shared TypeScript types for frontend and API.
- `i18n/`
  - `index.ts` — language and translation logic.
- `locales/` — translations for `es`, `en`, `de`, `fr`, `ca`, `mk`, `ja`, `ko`, `zh-CN`.
- `public/` — public assets, currently SVGs and static files.

## Key features

- `Password Analyzer`
  - Detects length, lowercase, uppercase, numbers, and symbols.
  - Checks common patterns like `1234`, `abcd`, `qwerty`, `1111`, and `aaaa`.
  - Displays a strength bar and label.
  - Shows estimated crack time using `zxcvbn-ts`.
- `Password Generator`
  - Length options from 6 to 32 characters.
  - Toggle uppercase, lowercase, numbers, and symbols.
  - Copy generated password to clipboard.
- `Internationalization`
  - Detects the browser language.
  - Stores selected language in `localStorage`.
  - Translates the interface in real time.
- `Theme support`
  - Detects system preferred theme.
  - Allows manual switching between light and dark modes.

## Dependencies

- `next` — React framework with API routes support.
- `react` / `react-dom` — UI library.
- `@zxcvbn-ts/core` + `@zxcvbn-ts/language-common` — password strength analysis on the server.
- `flag-icons` — flag icons for language selection.

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
npm run lint
```

## Internal APIs

- `POST /api/analyze`
  - Request body: `{ password }`
  - Response: `{ score, guesses, crackTime }`
- `POST /api/generate`
  - Request body: `{ length, useUpper, useLower, useNumbers, useSymbols }`
  - Response: `{ password }`

## Localization

The app includes translations for:

- Spanish (`es`)
- English (`en`)
- German (`de`)
- French (`fr`)
- Catalan (`ca`)
- Macedonian (`mk`)
- Japanese (`ja`)
- Korean (`ko`)
- Simplified Chinese (`zh-CN`)

Language selection logic is in `i18n/index.ts`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Notes

- `app/page.tsx` is the main UI entry point.
- The analyzer and generator use simple internal Next.js API routes.
- The app combines inline styles with minimal global CSS for simplicity.

---

## Author

[](https://github.com/ChampCTE)
**Cèlia Trullà Estruch**
© 2026 — All rights reserved

For commercial use or special permissions, please contact:
📧 [celia.trulla@gmail.com](mailto:celia.trulla@gmail.com)