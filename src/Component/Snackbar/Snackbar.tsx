import React from "react";
import { styled } from "@mui/system";
import type { ColorsType } from "../../typings/color";
import { SNACKBAR_OPTIONS } from "../../data";
import { Gutter } from "../Gutter";
import { Typography } from "@mui/material";
import { FlexRow } from "../Flex";
import type { CustomContentProps } from "notistack";

const Wrapper = styled(FlexRow, {
  shouldForwardProp: (props) => props !== "color",
})<{ color: ColorsType }>`
  background-color: ${({ theme, color }) => {
    return theme.palette[color || "grey"]["100"];
  }};
  padding: 7px 0 7px 7px;
  border-radius: 25px;
  color: ${({ theme, color }) => theme.palette[color || "gray"]["700"]};
  align-items: center;
  justify-content: flex-start;

  :hover {
    cursor: pointer;
  }
`;

const Btn = styled(Wrapper)`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Snackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ variant, message }, ref) => {
    const color = SNACKBAR_OPTIONS[variant].color;
    const { text, hide } = SNACKBAR_OPTIONS[variant];
    return (
      <Wrapper ref={ref} color={color}>
        {!hide && (
          <>
            <Btn color={color}>
              <Typography variant={"caption"}>{text}</Typography>
            </Btn>
            <Gutter gap={1} />
          </>
        )}
        <Typography variant={"caption"} fontWeight={600}>
          {message}
        </Typography>
        <Gutter gap={2} />
      </Wrapper>
    );
  },
);

Snackbar.displayName = "Snackbar";
