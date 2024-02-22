import React, {
  type ChangeEvent,
  type CSSProperties,
  useCallback,
} from "react";
import { useField } from "formik";
import type { TextInputProps } from "../Atoms";
import { TextInput } from "../Atoms";
import { POSITIVE_NUMBER_WITH_DECILMAL, type Regex } from "../../helpers";
import { Label } from "../Atoms/Label";
import { FlexCol } from "../Flex";

export type FieldNumberInputProps = Omit<
  TextInputProps,
  "onBlur" | "onChange" | "onFocus"
> & {
  regex?: Regex;
  name: string;
  placeholder?: string;
  wrapperStyle?: CSSProperties;
  nextInputRef?: React.MutableRefObject<typeof TextInput> | null;
  onBlur?(text?: string): void;
};

export const FieldNumberInput = React.forwardRef<
  TextInputProps,
  FieldNumberInputProps
>(
  (
    { name, regex, onBlur, title, id, wrapperStyle, nextInputRef, ...props },
    ref,
  ) => {
    const [field, meta, helpers] = useField(name as any);

    const error = meta.touched && meta.error;

    const handleBlur = useCallback(() => {
      helpers.setTouched(true);
      onBlur?.(meta.value);
    }, [helpers, meta.value, onBlur]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.match(regex || POSITIVE_NUMBER_WITH_DECILMAL)) {
        helpers.setValue(e.target.value);
      }
    };

    return (
      <FlexCol align={"flex-start"} style={wrapperStyle}>
        {title && <Label>{title}</Label>}
        <TextInput
          variant={"outlined"}
          id={id || "outlined-basic"}
          value={field.value ? field.value.toString() : ""}
          onChange={onChange}
          type={"tel"}
          error={!!error}
          onBlur={handleBlur}
          helperText={error}
          {...props}
        />
      </FlexCol>
    );
  },
);

FieldNumberInput.displayName = "FieldNumberInput";
