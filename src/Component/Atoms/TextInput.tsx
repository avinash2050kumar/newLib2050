import React from "react";
import type { TextFieldProps } from "@mui/material";
import { TextField, useTheme } from "@mui/material";

export type TextInputProps = Omit<TextFieldProps, "sx"> & {
  title?: string;
};

export const TextInput: React.ComponentType<TextInputProps> = ({
  title,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <TextField
      id="outlined-basic"
      //className="textInput"
      InputLabelProps={{ shrink: false }}
      {...rest}
    />
  );
};
