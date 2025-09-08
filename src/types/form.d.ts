import { ExternalValues } from "@/hooks/form/useForm";

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
export type FormParameters<T> = EssentialFormParameters<T> &
  AdditonalFormParameters<T>;

export interface Error {}

export type FormValueType = any;

export type GeneralFormType = Record<string, FormValueType>;
