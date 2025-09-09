import { invalid } from "../../utils/validate";
import { useDebounce } from "react-simplikit";
import { ValidateSchema } from "@/types/validate/schema";
import { ValidateResult } from "@/constants";
import { GeneralFormType } from "@/types/form";
import useInvalidField from "./useInvalidField";

const useValidate = <T extends GeneralFormType>(
  form: T,
  validateSchema?: ValidateSchema<T>
) => {
  const { addInvalidField, removeInvalidField, invalidField } =
    useInvalidField<T>();

  const isValidationOn =
    validateSchema !== undefined && validateSchema !== null;

  const debouncedValidate = useDebounce((name: keyof T | null, value: any) => {
    validate(name, value);
  }, 500);

  const validateAll = (): ValidateResult => {
    const validateResults: ValidateResult[] = [];
    for (const key of Object.keys(validateSchema!)) {
      const result = validate(key, form[key]);

      validateResults.push(result);
    }

    return validateResults.includes(ValidateResult.Invalid)
      ? ValidateResult.Invalid
      : ValidateResult.Valid;
  };

  /**
   * Validates a specific field based on the provided validation schema.
   *
   * @param name - The name of the field to validate.
   * @param value - The value of the field to validate.
   */

  const validate = (name: keyof T | null, value: T): ValidateResult => {
    const isError = invalid<T>(value, validateSchema?.[name]!);

    if (isError) {
      addInvalidField(name, value);
      return ValidateResult.Invalid;
    }
    removeInvalidField(name);
    return ValidateResult.Valid;
  };

  return {
    validateAll,
    isValidationOn,
    debouncedValidate,
    invalidField,
    validate,
  };
};

export default useValidate;
