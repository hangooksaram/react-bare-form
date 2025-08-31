export type StringValidateKeys = "minLength" | "maxLength" | "isString";
export type NumberValidateKeys = "min" | "max" | "isNumber";
export type CommonValidateKeys = "required" | "regex";

export type ValidateKeys =
  | StringValidateKeys
  | NumberValidateKeys
  | CommonValidateKeys;

export type StringValidateSchema = Partial<
  Record<StringValidateKeys, ValidateInfo>
>;
export type NumberValidateSchema = Partial<
  Record<NumberValidateKeys, ValidateInfo>
>;
export type CommonValidateSchema = Partial<
  Record<CommonValidateKeys, ValidateInfo>
>;

type FieldValidation<T> = T extends string
  ? StringValidateSchema & CommonValidateSchema
  : T extends number
  ? NumberValidateSchema & CommonValidateSchema
  : never;

export type ValidateSchema<T> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

export type InvalidField<T> = { [key in keyof T]: any } | null;
