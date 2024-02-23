// type RGB = `rgb(${number},${number},${number})`
// type RGBA = `rgba(${number},${number},${number},${number})`

type HEX = `#${string}`;

export type ColorsCodeType = HEX; // RGB | RGBA  add only when necessary

export type ColorsType =
  | "yellow"
  | "green"
  | "red"
  | "orange"
  | "gray"
  | "rose"
  | "pink"
  | "purple"
  | "indigo"
  | "blue"
  | "blueGray"
  | "blueLight"
  | "black"
  | "white"
  | "error"
  | "success"
  | "warning"
  | "primary";

export type ColorsCode = ColorsType | ColorsCodeType;
