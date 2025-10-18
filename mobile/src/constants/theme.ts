import { Platform } from "react-native";

// This is drived directly from the Eldritch theme
// https://github.com/eldritch-theme
export const Colors = {
  greyDarker: {
    name: "Sunken Depths Grey",
    hex: "#212337",
  },
  grey: {
    name: "Shallow Depths Grey",
    hex: "#323449",
  },
  white: {
    name: "Lighthouse White",
    hex: "#ebfafa	",
  },
  cyan: {
    name: "Watery Tomb Blue",
    hex: "#04d1f9",
  },
  green: {
    name: "Great Old One Green",
    hex: "#37f499",
  },
  orange: {
    name: "Dreaming Orange",
    hex: "#f7c67f",
  },
  pink: {
    name: "Pustule Pink",
    hex: "#f265b5",
  },
  purple: {
    name: "Lovecraft Purple",
    hex: "#a48cf2",
  },
  purpleDarker: {
    name: "The Old One Purple",
    hex: "#7081d0	",
  },
  red: {
    name: "R'lyeh' Red",
    hex: "#f16c75",
  },
  yellow: {
    name: "Gold of Yuggoth",
    hex: "#f1fc79",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
