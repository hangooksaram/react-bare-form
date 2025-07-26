import { useEffect, useState } from "react";
import useErrors from "../errors/useErrors";
import { invalid } from "../../utils/validate";
import { ValidateSchema } from "../../types";
import { useDebounce } from "react-simplikit";

const useValidate = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema,
) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const isValidationOn =
    validateSchema !== undefined && validateSchema !== null;
  const { errors, updateError, deleteError } = useErrors<T>();
  const debouncedValidate = useDebounce(<T,>(name: string, value: T) => {
    validateAndUpdateError(name!, value);
  }, 500);

  const validateAll = () => {
    for (const key of Object.keys(validateSchema)) {
      validateAndUpdateError(key, form[key]);
    }
  };

  const validateAndUpdateError = (name: string, value: any) => {
    const errorMessage = invalid(value, validateSchema[name]);

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
