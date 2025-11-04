import { Platform } from "react-native";

// This is drived directly from the Eldritch theme
// https://github.com/eldritch-theme
export const Colors = {
  primary: {
    950: "#FDFCFC",
    300: "#D4D4D4",
  },
  secondary: {
    800: "#878787",
    700: "#6E6E6E",
    500: "#3F4040",
    400: "#383939",
  },
  info: {
    950: "#ECF8FE",
    600: "#57C2F6",
    400: "#0DA6F2",
    300: "#0B8DCD",
    50: "#05405D",
  },
  success: {
    900: "#CAFFE8",
    50: "#14532D",
  },
  error: {
    400: "#E63535",
  },
};

export const Spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 25,
  xl: 40,
};

export const BorderRadius = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 25,
  xl: 40,
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
