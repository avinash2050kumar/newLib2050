import { styled } from "@mui/material/styles";

export interface IFlexProps {
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "initial"
    | "inherit";
  align?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline"
    | "initial"
    | "inherit";
  wrap?: "wrap";
}

export const FlexRow = styled("div", {
  shouldForwardProp: (props) => props !== "props",
})<IFlexProps>((props) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: props.align ? props.align : "flex-start",
  flexWrap: props.wrap ? props.wrap : "wrap",
  justifyContent: props.justify ? props.justify : "flex-start",
}));

export const FlexCol = styled("div", {
  shouldForwardProp: (props) => props !== "props",
})<IFlexProps>((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: props.align ? props.align : "flex-start",
  flexWrap: props.wrap ? props.wrap : "wrap",
  justifyContent: props.justify ? props.justify : "flex-start",
}));
