import { useState } from "react";

export interface FormErrors {
  [key: string]: string;
}

const useErrors = <T extends FormErrors>() => {
  const [errors, setErrors] = useState<T | null>(null);

  const updateError = (key: string, errorMessage: string) => {
    setErrors((prev) => ({ ...prev!, [key]: errorMessage! }));
  };

  const deleteError = (key: string) => {
    if (errors !== null) {
      setErrors((prev: T | null) => {
        const copied = { ...(prev as T) };
        delete copied[key];
        return copied;
      });
    }
  };

  return {
    errors,
    updateError,
    deleteError,
  };
};
export default useErrors;
