import { ChangeEvent, useEffect, useState } from "react";
import useValidateForm from "./useValidateForm";
import useRefs from "./useRefs";
import { ValidateSchema } from "../../types";
import useSubmit from "./useSubmit";
import useValues from "./useValues";

export type ExternalValues<T> = T & { [key: string]: any };

/**
 *
 * @param initialValues : Initial values for the form.
 * @param validationSchema : Schema for validating form values. If this option is not provided, validation will not be performed.
 * @param externalValues : External values to load into the form.
 *
 * @returns
 */
const useForm = <T extends object>(
  initialValues: T,
  validationSchema?: ValidateSchema,
  externalValues?: ExternalValues<T>
) => {
  const { values, bareHandleChange } = useValues<T>(
    initialValues,
    externalValues
  );
  const {
    errors,
    validateAllFormValues,
    isValid,
    firstErroryKey,
    isValidationOn,
    debouncedValidate,
  } = useValidateForm<T>(values, validationSchema!);
  const { focusWhenInvalid } = useRefs(firstErroryKey);
  const { isSubmitted, submitAttempted } = useSubmit();
  const isNotValidateCondition = !isSubmitted || !isValidationOn;

  useEffect(() => {
    if (submitAttempted > 0) {
      validateAllFormValues();
    }
  }, [submitAttempted]);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: T }
  ) => {
    const target = "target" in e ? e.target : e;
    const { name, value } = target;
    bareHandleChange(name, value);

    if (isNotValidateCondition) {
      return;
    }

    debouncedValidate(name, value);
  };

  return {
    values,
    handleChange,
    errors,
    isSubmitted,
    isValid,
    focusWhenInvalid,
  };
};

export default useForm;
