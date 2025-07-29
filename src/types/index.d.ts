import { ExternalValues } from "@/hooks/form/useForm";

export type ValidateKeys = "required" | "regex" | "min" | "max" | "minLength";
export type ValidateInfoValue = RegExp | number | undefined;
export interface ValidateInfo {
  message?: string;
  value?: ValidateInfoValue;
}
export type ValidateFunction = (value?: ValidateInfoValue) => boolean;
export type ValidateSchemaValue = Partial<Record<ValidateKeys, ValidateInfo>>;

export interface ValidateSchema {
  [key: string]: ValidateSchemaValue;
}

export interface EssentialFormParameters<T extends object> {
  initialValues: T;
  onSubmit: (e: React.FormEvent) => void;
}

export interface AdditonalFormParameters<T extends object> {
  externalValues?: ExternalValues<T>;
  validationSchema?: ValidateSchema;
}

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
