export const NUMBER = !/!^(-|\+)?(([1-9][0-9]*)|(0))(?:\.[0-9]+)?$/g;
export const POSITIVE_NUMBER_WITH_DECILMAL = /^\d*\.?\d{0,2}$/;

export const phoneNumPatternForLogin = /[3]{1}[0-9]{2}[0-9]{7}/;
export const POSITIVE_NUMBER = /^\d*$/;
export type Regex = typeof POSITIVE_NUMBER | typeof NUMBER;
