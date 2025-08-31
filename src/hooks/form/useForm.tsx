import { ChangeEvent, useEffect, useState } from "react";
import useValidate from "../validate/useValidate";
import useRefs from "./useRefs";
import { FormParameters } from "../../types/form";
import useSubmit from "./useSubmit";
import useValues from "./useValues";
import useScrollWhenError from "../errors/useScrollWhenError";
import useErrors from "../errors/useErrors";
import usePreventLeaveWithoutSubmit from "../usePreventLeaveWithoutSubmit";

export type ExternalValues<T> = T & { [key: string]: any };

/**
 *
 * @param initialValues : Initial values for the form.
 * @param validationSchema : Schema for validating form values. If this option is not provided, validation will not be performed.
 * @param externalValues : External values to load into the form.
 *
 * @returns
 */
const useForm = <T extends { [key: string]: any }>(
  formParameters: FormParameters<T>
) => {
  const { initialValues, validationSchema, externalValues, onSubmit } =
    formParameters;

  const [isDirty, setIsDirty] = useState(false);

  const { values, bareHandleChange } = useValues<T>(
    initialValues,
    externalValues
  );
  const { registerRef, scrollToErrorElement, formElementRefs } = useRefs();
  const { invalidField, validateAll, isValidationOn, debouncedValidate } =
    useValidate<T>(values, validationSchema!);
  const { errors } = useErrors<T>(invalidField, validationSchema);
  useScrollWhenError<T>(errors, formElementRefs, scrollToErrorElement);
  const { handleSubmit } = useSubmit(onSubmit, validateAll);
  usePreventLeaveWithoutSubmit(isDirty);

  const isNotValidateCondition = !isValidationOn;

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: T }
  ) => {
    const target = "target" in e ? e.target : e;
    const { name, value } = target;
    bareHandleChange(name, value);

    if (isDirty === false) {
      setIsDirty(true);
    }

    if (isNotValidateCondition) {
      return;
    }

    debouncedValidate(name, value);
  };

  return {
    values,
    handleChange,
    errors,
    registerRef,
    handleSubmit,
  };
};

export default useForm;
