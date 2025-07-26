import { ChangeEvent, useEffect, useState } from "react";
import { ExternalValues } from "./useForm";
import { mergeValuesIfKeyExisted } from "@/utils/dataTypes";

const useValues = <T extends object>(
  initialValues: T,
  externalValues?: ExternalValues<T>,
) => {
  const [values, setValues] = useState<T>(initialValues);
  useEffect(() => {
    if (externalValues) {
      const newValues = mergeValuesIfKeyExisted<T>(values, externalValues);
      setValues(newValues);
    }
  }, [externalValues]);

  const bareHandleChange = (name: string, value: string | T) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, setValues, bareHandleChange };
};

export default useValues;
