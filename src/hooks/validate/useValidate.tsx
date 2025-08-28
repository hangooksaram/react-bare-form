import { useEffect, useState } from "react";
import { invalid } from "../../utils/validate";
import { useDebounce } from "react-simplikit";
import { InvalidField, ValidateSchema } from "@/types/validate";

const useValidate = <T extends { [key: string]: any }>(
  form: T,
  validateSchema?: ValidateSchema<T>
) => {
  const [invalidField, setInvalidField] = useState<InvalidField<T>>(null);

  const isValidationOn =
    validateSchema !== undefined && validateSchema !== null;

  const isInvalid =
    invalidField !== null && Object.keys(invalidField).length > 0;

  const debouncedValidate = useDebounce((name: keyof T | null, value: any) => {
    validate(name, value);
  }, 500);

  const validateAll = () => {
    for (const key of Object.keys(validateSchema!)) {
      validate(key, form[key]);
    }
  };

  /**
   * Validates a specific field based on the provided validation schema.
   *
   * @param name - The name of the field to validate.
   * @param value - The value of the field to validate.
   */

  const validate = (name: keyof T | null, value: T) => {
    const isError = invalid<T>(value, validateSchema?.[name]!);

    if (isError) {
      setInvalidField((prev) => ({
        ...prev!,
        [name as string]: value,
      }));
      return;
    }
    setInvalidField((prev): InvalidField<T> => {
      const newField = { ...prev } as InvalidField<T>;
      delete newField![name as string];
      return newField;
    });
  };

  return {
    validateAll,
    isValidationOn,
    debouncedValidate,
    invalidField,
    validate,
    isInvalid,
  };
};

export default useValidate;
