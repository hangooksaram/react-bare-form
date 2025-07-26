import { scrollToElement } from "@/utils/ref";
import { useEffect, useRef } from "react";

const useRefs = () => {
  const formElementRefs = useRef<{ [key: string]: HTMLElement }>({});
  const shouldNotScrollConditions = (key: string) => {
    return {
      isNotSettedRef: !formElementRefs.current[key],
    };
  };
  const cannotScrollTo = (el: HTMLInputElement) =>
    Object.values(shouldNotScrollConditions(el.name)).some(
      (condition) => condition
    );

  const setRef = (el: HTMLElement, key: string) => {
    formElementRefs.current![key] = el!;
  };

  /**
   * Registers the input element for form state and validation management.
   *
   * To enable features such as auto-focusing the first invalid input after validation failure (e.g., for accessibility or UX improvements),
   * you must spread the return value of this function into your input element
   *
   * @example
   * <input {...registerRef('fieldName')} />
   * @param key - The name of the form element to register.
   * @returns An object containing a ref callback and the name of the form element.
   */
  const registerRef = (key: string): Object => {
    return {
      ref: (el: HTMLInputElement | null) => {
        if (el) {
          setRef(el, key);
        }
      },
      name: key,
    };
  };

  const scrollToErrorElement = (el: HTMLInputElement) => {
    if (cannotScrollTo(el)) {
      return;
    }
    scrollToElement(formElementRefs.current[el.name]);
  };

  return { registerRef, scrollToErrorElement, formElementRefs };
};
export default useRefs;
