import { useEffect } from "react";

const useScrollWhenError = <T,>(
  error: T | null,
  formElementRefs: React.RefObject<{ [key: string]: HTMLElement }>,
  scrollToErrorElement: (el: HTMLInputElement) => void
) => {
  const firstErrorKey = error ? Object.keys(error)[0] : null;

  useEffect(() => {
    if (firstErrorKey) {
      scrollToErrorElement(
        formElementRefs.current[firstErrorKey] as HTMLInputElement
      );
    }
  }, [error, firstErrorKey]);
};

export default useScrollWhenError;
