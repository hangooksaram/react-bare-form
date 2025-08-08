import { ExternalValues } from "@/hooks/form/useForm";

export type StringValidateKeys = "minLength";
export type NumberValidateKeys = "min" | "max";
export type CommonValidateKeys = "required" | "regex";

export type ValidateKeys =
  | StringValidateKeys
  | NumberValidateKeys
  | CommonValidateKeys;

export type ValidateInfoValue = RegExp | number | undefined;
export interface ValidateInfo {
  message?: string;
  value?: ValidateInfoValue;
}
export type ValidateFunction = (value?: ValidateInfoValue) => boolean;

export type StringValidateSchema = Partial<
  Record<StringValidateKeys, ValidateInfo>
>;
export type NumberValidateSchema = Partial<
  Record<NumberValidateKeys, ValidateInfo>
>;
export type CommonValidateSchema = Partial<
  Record<CommonValidateKeys, ValidateInfo>
>;
export type ValidateSchemaValue = Partial<Record<ValidateKeys, ValidateInfo>>;

type FieldValidation<T> = T extends string
  ? StringValidateSchema & CommonValidateSchema
  : T extends number
  ? NumberValidateSchema & CommonValidateSchema
  : never;

export type ValidateSchema<T> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

export interface EssentialFormParameters<T extends object> {
  initialValues: T;
  onSubmit: (e: React.FormEvent) => void;
}

export interface AdditonalFormParameters<T extends object> {
  externalValues?: ExternalValues<T>;
  validationSchema?: ValidateSchema;
}

export type FormInputElement = HTMLInputElement | HTMLTextAreaElement;

/**
 *
 * * required properties for form parameters
 * @initialValues
 * @onSubmit
 *
 *
 * * additional properties for form parameters
 * @externalValues
 * @validationSchema
 *
 */
export type FormParameters<T extends object> = EssentialFormParameters<T> &
  AdditonalFormParameters<T>;

export interface Error {}
