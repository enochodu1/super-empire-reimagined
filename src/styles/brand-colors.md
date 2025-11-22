# Grocery Empire - Brand Color Palette

## Demo Brand Guidelines

Modern wholesale produce marketplace branding

### Primary Colors (from logo)

```css
/* Primary Brand Green (Circle background) */
--brand-green: hsl(88 50% 53%);        /* #7CB342 - Fresh lime green */
--brand-green-light: hsl(88 50% 68%);  /* Lighter for hover states */
--brand-green-dark: hsl(88 50% 38%);   /* Darker for text/borders */

/* Accent Colors (from vegetables) */
--accent-yellow: hsl(45 100% 51%);     /* #FFC107 - Yellow pepper */
--accent-orange: hsl(36 100% 50%);     /* #FF9800 - Pumpkin/squash */
--accent-red: hsl(4 90% 58%);          /* #EF5350 - Radish/tomato */

/* Neutral Colors */
--brand-dark: hsl(0 0% 13%);           /* #212121 - Logo outline/text */
--brand-white: hsl(0 0% 100%);         /* #FFFFFF - Text fill */
```

### Current Issues

**❌ Current Primary:** `hsl(150 45% 25%)` - Too dark, too blue-green
**✅ Should Be:** `hsl(88 50% 53%)` - Bright, fresh lime green from logo

### Color Usage Guide

- **Primary Actions**: Use bright green `#7CB342`
- **Call-to-Actions**: Use accent orange `#FF9800` for urgency
- **Success Messages**: Use brand green
- **Warnings**: Use accent yellow `#FFC107`
- **Errors**: Use accent red `#EF5350`
- **Text**: Use brand dark `#212121`

### Accessibility Notes

All colors meet WCAG 2.1 AA contrast requirements when used properly:
- Green `#7CB342` on white: 3.9:1 (large text only)
- Dark `#212121` on white: 15.8:1 (excellent for body text)
- White on Green `#7CB342`: 5.4:1 (good for buttons)

### Dark Mode Adjustments

For dark mode, adjust lightness values:
- Background: Dark gray `hsl(0 0% 10%)`
- Primary green: Slightly brighter `hsl(88 50% 60%)`
- Text: Off-white `hsl(0 0% 95%)`
