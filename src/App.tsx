import React from "react";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider,} from "@mui/material";
import {getDesignTokens} from "../src/Theme";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {SnackBarStackWrapper} from "../src/Component";
import type {PaletteOptions} from "@mui/material/styles/createPalette";

type AppProps = {
    children: React.ReactNode;
    palette?: PaletteOptions;
    theme?: "light" | "dark";
};

export const App: React.FC<AppProps> = ({children, palette, theme = "light"}) => {
    const themeMode = React.useMemo(
        () => createTheme(getDesignTokens(theme, palette)),
        [theme],
    );

    return (
        <ThemeProvider
            theme={responsiveFontSizes(themeMode, {
                breakpoints: ["xs", "sm", "md", "lg", "xl", "xxl"],
                factor: 5,
            })}
        >
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <SnackBarStackWrapper>
                    <CssBaseline/>
                    {children}
                </SnackBarStackWrapper>
            </LocalizationProvider>
        </ThemeProvider>
    );
};
