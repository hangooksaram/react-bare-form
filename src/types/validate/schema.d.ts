import { ValidateInfo } from "./util";

export type StringValidateKeys =
  | "minLength"
  | "maxLength"
  | "isString"
  | "isDate";
export type NumberValidateKeys = "min" | "max" | "isNumber";
export type DateValidateKeys = "isDate";
export type FileValidateKeys = "isFile";
export type CommonValidateKeys = "required" | "regex";

export type ValidateKeys =
  | StringValidateKeys
  | NumberValidateKeys
  | DateValidateKeys
  | FileValidateKeys
  | CommonValidateKeys;

export type StringValidateSchema = Partial<
  Record<StringValidateKeys, ValidateInfo>
>;
export type NumberValidateSchema = Partial<
  Record<NumberValidateKeys, ValidateInfo>
>;
export type DateValidateSchema = Partial<
  Record<DateValidateKeys?, ValidateInfo>
>;
export type FileValidateSchema = Partial<
  Record<FileValidateKeys?, ValidateInfo>
>;
export type CommonValidateSchema = Partial<
  Record<CommonValidateKeys, ValidateInfo>
>;

type FieldValidation<T> = T extends string
  ? StringValidateSchema & CommonValidateSchema
  : T extends number
  ? NumberValidateSchema & CommonValidateSchema
  : T extends Date
  ? DateValidateSchema & CommonValidateSchema
  : T extends File
  ? FileValidateSchema & CommonValidateSchema
  : never;

/**
 * ValidateSchema
 * @description A schema for validating form fields, where each key corresponds to a field in the form values and the value is the validation rules for that field.
 *
 * This type ensures that appropriate validation fields and rules are auto-completed.
 * @example
 * ```ts
 * const validationSchema: ValidateSchema<FormValues> = {
 *   email: {
 *     required: { message: "Email is required." },
 *     regex: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },
 *     isString: { message: "Must be a string." },
 *   },
 *   age: {
 *     required: { message: "Age is required." },
 *     min: { value: 18, message: "Must be at least 18." },
 *     max: { value: 120, message: "Must be at most 120." },
 *     isNumber: { message: "Must be a number." },
 *   },
 * };
 * ```
 */
export type ValidateSchema<T> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

export type InvalidField<T> = { [key in keyof T]: any } | null;
