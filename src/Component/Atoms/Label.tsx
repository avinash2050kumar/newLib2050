import React from "react";
import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";

type LabelProps = TypographyProps;

export const Label: React.ComponentType<LabelProps> = ({
  children,
  ...rest
}) => {
  return (
    <Typography fontWeight={500} variant={"caption"} {...rest}>
      {children}
    </Typography>
  );
};
