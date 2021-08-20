import React from "react";
import { str2color, str2PaletteType }from "./usePalette"

// Customize main theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// See https://material-ui.com/customization/color/#color for details
//import primary from "@material-ui/core/colors/teal";
//import secondary from "@material-ui/core/colors/pink";

// See https://material-ui.com/customization/theming/#createmuitheme-options-args-theme for details
export default function ThemeWrapper({ children, palette }) {
  const colorTheme = createMuiTheme({
    palette: {
      primary: str2color(palette.primary),
      secondary: str2color(palette.secondary),
      type: str2PaletteType(palette.type),
    }
  });
  
  return <MuiThemeProvider theme={colorTheme}>{children}</MuiThemeProvider>;
}
