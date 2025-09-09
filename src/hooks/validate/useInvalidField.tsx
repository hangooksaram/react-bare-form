import { GeneralFormType } from "@/types/form";
import { InvalidField } from "@/types/validate/schema";
import { useState } from "react";

const useInvalidField = <T extends GeneralFormType>() => {
  const [invalidField, setInvalidField] = useState<InvalidField<T>>(null);

  const addInvalidField = (name: keyof T | null, value: T) => {
    setInvalidField((prev) => ({
      ...prev!,
      [name as string]: value,
    }));
  };

  const removeInvalidField = (name: keyof T | null) => {
    if (invalidField !== null) {
      setInvalidField((prev): InvalidField<T> => {
        const newField = { ...prev } as InvalidField<T>;
        delete newField![name as string];
        return newField;
      });
    }
  };

  return { invalidField, addInvalidField, removeInvalidField };
};

export default useInvalidField;
