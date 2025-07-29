# SVG Buttons

A collection of customizable SVG-based web components that provide accessible
button controls with consistent styling and behavior. Built using Google
Material Icons for consistent, high-quality SVG button graphics.

## Demo

Try out the live demo at
[https://conor-dowdall.github.io/svg-buttons/](https://conor-dowdall.github.io/svg-buttons/)

## Features

- Lightweight SVG buttons using Google Material Icons
- Custom element web components
- Built-in accessibility support with ARIA labels
- Toggle button functionality
- Dark/light theme compatible
- Customizable hover and pressed states
- TypeScript implementation

## Available Components

```html
<!-- Standard Buttons -->
<settings-svg-button></settings-svg-button>
<edit-svg-button></edit-svg-button>
<close-svg-button></close-svg-button>
<palette-svg-button></palette-svg-button>
<save-svg-button></save-svg-button>

<!-- Toggle Button -->
<resize-toggle-svg-button></resize-toggle-svg-button>
```

## Customization

### Aria Labels

You can customize the button labels for accessibility:

```html
<settings-svg-button button-aria-label="My App Settings"></settings-svg-button>
```

### CSS Custom Properties

```css
/* Override hover and pressed state colors */
:root {
  --svg-button-hover-color: rgba(255, 255, 255, 0.2);
  --svg-button-pressed-color: rgba(255, 255, 255, 0.4);
  --svg-button-internal-padding: 0.3em;
}
```

## Usage

Import the components you need:

```html
<script type="module" src="dist/svg-buttons/settings-svg-button.js"></script>
<script
  type="module"
  src="dist/svg-buttons/resize-toggle-svg-button.js"
></script>
```

## Development

The project uses TypeScript and web components standards. SVG icons are sourced
from Google Material Icons. Typescript build outputs are generated in the `dist`
directory.

## Credits & Licenses

- SVG icons from [Google Material Icons](https://fonts.google.com/icons) using
  [Apache License 2.0](LICENSE)
- All other code and documentation in this project is released under
  [CC0 1.0 Universal License](LICENSE)
