import { FormErrors } from "@/types/error";
import { FormInputElement, GeneralFormType } from "@/types/form";
import { useEffect } from "react";

interface ScrollWhenErrorProps<T extends GeneralFormType> {
  errors: FormErrors<T> | null;
  formElementRefs: React.RefObject<{ [key: string]: HTMLElement }>;
  scrollToErrorElement: (el: FormInputElement) => void;
  scrollOnError?: boolean;
}

const useScrollWhenError = <T extends GeneralFormType>(
  props: ScrollWhenErrorProps<T>
) => {
  const { errors, formElementRefs, scrollToErrorElement, scrollOnError } =
    props;
  const firstErrorKey = errors ? Object.keys(errors)[0] : null;

  useEffect(() => {
    if (!scrollOnError) {
      return;
    }
    if (!firstErrorKey) {
      return;
    }

    const firstErrorEl = formElementRefs.current[firstErrorKey];

    if (!firstErrorEl) {
      return;
    }

    scrollToErrorElement(
      formElementRefs.current[firstErrorKey] as FormInputElement
    );
  }, [errors, firstErrorKey]);
};

export default useScrollWhenError;
