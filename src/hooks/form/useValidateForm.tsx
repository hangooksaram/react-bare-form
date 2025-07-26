import { useEffect, useState } from "react";
import useErrors from "./useErrors";
import { invalid } from "./validate";
import { ValidateSchema } from "../../types";
import { useDebounce } from "react-simplikit";

const useValidateForm = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema
) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const isValidationOn =
    validateSchema !== undefined && validateSchema !== null;
  const { errors, updateError, deleteError, firstErroryKey } = useErrors<T>();
  const debouncedValidate = useDebounce(<T,>(name: string, value: T) => {
    validate(name!, value);
  }, 500);

  const validateAllFormValues = () => {
    for (const key of Object.keys(validateSchema)) {
      validate(key, form[key]);
    }
  };

  const validate = (key: string, value: any) => {
    const errorMessage = invalid(value, validateSchema[key]);

    if (errorMessage) {
      updateError(key, errorMessage);

      return;
    }
    deleteError(key);
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
    validate,
    validateAllFormValues,
    errors,
    firstErroryKey,
    isValidationOn,
    debouncedValidate,
  };
};

export default useValidateForm;
