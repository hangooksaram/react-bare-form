import { useEffect, useState } from "react";
import useErrors from "../errors/useErrors";
import { invalid } from "../../utils/validate";
import { useDebounce } from "react-simplikit";
import { ValidateSchema } from "@/types/validate";

const useValidate = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema<T>
) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const isValidationOn =
    validateSchema !== undefined && validateSchema !== null;
  const { errors, updateError, deleteError } = useErrors<T>();
  const debouncedValidate = useDebounce(<T,>(name: string, value: T) => {
    validateAndUpdateError<T>(name!, value);
  }, 500);

  const validateAll = () => {
    for (const key of Object.keys(validateSchema)) {
      validateAndUpdateError(key, form[key]);
    }
  };

  const validateAndUpdateError = <T,>(name: string, value: T) => {
    const errorMessage = invalid<T>(value, validateSchema[name]!);

    if (errorMessage) {
      updateError(name, errorMessage);

      return;
    }
    deleteError(name);
  };

  useEffect(() => {
    if (errors === null) {
      setIsValid(true);
      return;
    }
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  return {
    isValid,
    validateAndUpdateError,
    validateAll,
    errors,
    isValidationOn,
    debouncedValidate,
  };
};

export default useValidate;
