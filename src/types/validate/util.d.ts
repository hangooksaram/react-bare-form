export type ValidateInfoValue = RegExp | number | undefined;
export interface ValidateInfo {
  message?: string;
  value?: ValidateInfoValue;
}
export type ValidateFunction = (value?: ValidateInfoValue) => boolean;

export type ValidateSchemaValue = Partial<Record<ValidateKeys, ValidateInfo>>;
