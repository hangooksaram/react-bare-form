import { useEffect } from "react";
import { FormErrors } from "./useErrors";

const useScrollWhenError = <T,>(
  error: T | null,
  formElementRefs: React.RefObject<{ [key: string]: HTMLElement }>,
  scrollToErrorElement: (el: HTMLInputElement) => void,
) => {
  const firstErrorKey = error ? Object.keys(error)[0] : null;

  useEffect(() => {
    if (
      firstErrorKey &&
      formElementRefs.current[firstErrorKey] &&
      document.activeElement === formElementRefs.current[firstErrorKey]
    ) {
      scrollToErrorElement(
        formElementRefs.current[firstErrorKey] as HTMLInputElement,
      );
    }
  }, [error]);
};

export default useScrollWhenError;
