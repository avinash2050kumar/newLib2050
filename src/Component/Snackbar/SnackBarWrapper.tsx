import React, { type ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import type { SnackbarOrigin } from "@mui/material";
import { Snackbar } from "../Snackbar";

const MAX_SNACK = 2;
const AUTO_HIDE_DURATION = 5000;

const POSITION: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

export type SnackBarStackWrapperProps = {
  children: ReactNode;
};

export const SnackBarStackWrapper: React.ComponentType<
  SnackBarStackWrapperProps
> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={MAX_SNACK}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION}
      Components={{
        success: Snackbar,
        error: Snackbar,
        info: Snackbar,
        warning: Snackbar,
        default: Snackbar,
      }}
      variant={"error"}
    >
      {children}
    </SnackbarProvider>
  );
};
