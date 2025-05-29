# Color Configuration System

This document provides an overview of the color configuration system in this project.

## Files Structure

- `src/styles/_colors.scss`: Core SCSS color variables
- `src/styles/_mixins.scss`: SCSS mixins and utility functions
- `src/styles/config.scss`: Main SCSS configuration file that imports colors and mixins
- `src/styles/variables.less`: LESS version of the color variables 
- `src/styles/theme.ts`: TypeScript version of the theme for use in React components

## How to Use

### In SCSS Files

Use the config file at the top of your SCSS file:

```scss
@use './config' as *;

.my-component {
  color: $primary-color;
  background-color: $bg-light;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
  box-shadow: $box-shadow;
  
  // Using mixins
  @include flex-center;
  
  // Using media queries
  @include respond-to(md) {
    flex-direction: row;
  }
}
```

### In LESS Files

Import the variables file at the top of your LESS file:

```less
@import "./variables.less";

.my-component {
  color: @primary-color;
  background-color: @bg-light;
  border: 1px solid @border-color;
  border-radius: @border-radius-md;
  box-shadow: @box-shadow;
  
  // Using mixins
  .flex-center();
}
```

### In React Components

Import the theme or specific values from the theme file:

```tsx
import React from 'react';
import theme, { colors, typography } from '../styles/theme';

const MyComponent: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: colors.background.light,
    color: colors.text.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    fontFamily: theme.typography.fontFamily,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: typography.fontSize.xl }}>
        Styled with theme
      </h2>
    </div>
  );
};

export default MyComponent;
```

## Color Palette

The color system is organized into the following categories:

1. **Primary Colors**
   - Main brand color and variations

2. **Secondary Colors**
   - Secondary brand color and variations

3. **Neutral Colors**
   - White, black, and grays

4. **Text Colors**
   - For headings, body text, and disabled text

5. **Functional Colors**
   - For info, success, warning, and error states

6. **Background Colors**
   - For different background layers

## Additional Theme Properties

The theme also includes:

- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing values
- **Border Radius**: For different levels of corner rounding
- **Shadows**: For different elevation levels
- **Breakpoints**: For responsive design

## Extending

To add new colors or theme properties:

1. Add them to `_colors.scss`
2. Add them to `variables.less`
3. Add them to `theme.ts`

This ensures consistency across all styling approaches in the project.
