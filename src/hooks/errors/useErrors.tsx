import { InvalidField, ValidateSchema } from "@/types/validate";
import { invalid } from "@/utils/validate";
import { useEffect, useState } from "react";
import { usePrevious } from "react-simplikit";

export interface FormErrors {
  [key: string]: string;
}

const useErrors = <T extends FormErrors>(
  invalidField: InvalidField<T>,
  validateSchema: ValidateSchema<T>
) => {
  const [errors, setErrors] = useState<T | null>(null);
  const prevInvalidField = usePrevious(invalidField);

  const updateError = (key: keyof T | null, errorMessage: string) => {
    setErrors((prev) => ({ ...prev!, [key as string]: errorMessage! }));
  };

  const deleteError = (key: keyof T | null) => {
    if (errors !== null) {
      setErrors((prev: T | null) => {
        const copied = { ...(prev as T) };
        delete copied[key as string];
        return copied;
      });
    }
  };

  const updateErrorsByInvalidField = () => {
    if (!invalidField) {
      return;
    }
    Object.keys(invalidField).forEach((field) => {
      const errorMessage = invalid<T>(
        invalidField[field],
        validateSchema?.[field]!
      );
      updateError(field, errorMessage!);
    });
  };

  const deleteErrorsByPreviousInvalidField = () => {
    if (!prevInvalidField) {
      return;
    }
    Object.keys(prevInvalidField).forEach((field) => {
      if (!invalidField || !(field in invalidField)) {
        deleteError(field);
      }
    });
  };

  useEffect(() => {
    deleteErrorsByPreviousInvalidField();
  }, [prevInvalidField]);

  useEffect(() => {
    updateErrorsByInvalidField();
  }, [invalidField]);

  return {
    errors,
    updateError,
    deleteError,
  };
};
export default useErrors;
