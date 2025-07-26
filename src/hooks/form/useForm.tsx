import { ChangeEvent, useEffect, useState } from "react";
import useValidate from "../validate/useValidate";
import useRefs from "./useRefs";
import { ValidateSchema } from "../../types";
import useSubmit from "./useSubmit";
import useValues from "./useValues";
import useScrollWhenError from "../errors/useScrollWhenError";

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
  const { registerRef, scrollToErrorElement, formElementRefs } = useRefs();
  const { errors, validateAll, isValid, isValidationOn, debouncedValidate } =
    useValidate<T>(values, validationSchema!);
  useScrollWhenError<T>(errors, formElementRefs, scrollToErrorElement);
  const { isSubmitted, submitAttempted } = useSubmit();
  const isNotValidateCondition = !isSubmitted || !isValidationOn;

  useEffect(() => {
    if (submitAttempted > 0) {
      validateAll();
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
    registerRef,
  };
};

export default useForm;
