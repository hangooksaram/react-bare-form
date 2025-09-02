import { FormErrors } from "@/types/error";
import { FormInputElement } from "@/types/form";
import { useEffect } from "react";

const useScrollWhenError = <T extends object>(
  error: FormErrors<T> | null,
  formElementRefs: React.RefObject<{ [key: string]: HTMLElement }>,
  scrollToErrorElement: (el: FormInputElement) => void
) => {
  const firstErrorKey = error ? Object.keys(error)[0] : null;

  useEffect(() => {
    if (firstErrorKey) {
      scrollToErrorElement(
        formElementRefs.current[firstErrorKey] as FormInputElement
      );
    }
  }, [error, firstErrorKey]);
};

export default useScrollWhenError;
