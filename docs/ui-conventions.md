# UI Conventions <!-- omit in toc -->

<!-- Table of contents created using "Markdown All in One" VSCode extension. -->
<!-- Command palette: "> Markdown All in One: Update Table of Contents" -->

## Contents <!-- omit in toc -->

- [Philosophy](#philosophy)
- [Core Component Usage](#core-component-usage)
  - [`<Text>`](#text)
  - [`<Link>`](#link)

## Philosophy

The core components are designed with the following in mind.

- I hate display block.
- `<button>` and `<a>` are just divs.
- Prefer padding, gap, and spacers over margin.

[expand all of these with why]

## Core Component Usage

### `<Text>`

Example usage:

```tsx
<Text style="title">
  Some text, where <b>this bit</b> is bold.
</Text>
```

Do not nest another `<Text>` inside `<Text>`. Only the following tags should be used inside `<Text>`:

- `<Link>`
- `<b>` (or `<strong>`)
- `<i>` (or `<em>`)
- `<span>`

Why? Because `<Text>` uses pseudo-elements to size itself correctly and prevent changes in line height affecting the height of single-line text. This means they no longer behave like a normal `display: inline` `<span>` would, so when you just want to bold a section of a paragraph, etc. don't use `<Text>`.

### `<Link>`

Example usage:

```tsx
<Text>
  <Link href="TODO">Click here</Link> for a free iPhone 6S.
</Text>
```

Always use inside `<Text>`. Can use `onClick` as an alternative to `href`.
