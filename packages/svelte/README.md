# TDesign Icons Svelte

TDesign Icons for Svelte 5.

## Installation

```bash
npm install @tdesign/icons-svelte
# or
pnpm add @tdesign/icons-svelte
```

## Usage

### SVG Icon (Recommended)

Import individual icons as Svelte components for tree-shaking:

```svelte
<script>
  import { CloseIcon, SearchIcon } from '@tdesign/icons-svelte';
</script>

<CloseIcon />
<SearchIcon size="2em" />
```

### Custom Props

```svelte
<script>
  import { HomeIcon } from '@tdesign/icons-svelte';
</script>

<!-- Size -->
<HomeIcon size="small" />
<HomeIcon size="medium" />
<HomeIcon size="large" />
<HomeIcon size="24px" />
<HomeIcon size={24} />

<!-- Colors -->
<HomeIcon strokeColor="red" />
<HomeIcon fillColor="blue" />
<HomeIcon strokeColor={['red', 'green']} />
```

### SVG Sprite

Use `Icon` component for SVG Sprite mode:

```svelte
<script>
  import { Icon } from '@tdesign/icons-svelte';
</script>

<Icon name="close" />
<Icon name="search" size="large" />
```

### Icon Font

Use `IconFont` component for Icon Font mode:

```svelte
<script>
  import { IconFont } from '@tdesign/icons-svelte';
</script>

<IconFont name="close" />
<IconFont name="search" size="large" />
```

## Requirements

- Svelte 5.0+

## License

MIT
