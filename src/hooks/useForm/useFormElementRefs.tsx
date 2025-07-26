import { Ref, useRef } from 'react';
import { FormErrors } from './useFormErrors';

const useFormElementRefs = (
  firstErroryKey: string,
) => {
  const formElementRefs = useRef<{ [key: string]: HTMLElement }>({});
  const shouldNotScrollConditions = (key: string) => {
    return {
      isNotSettedRef: !formElementRefs.current[key],
      isCurrentKeyNotFirstErrorKey: key !== firstErroryKey,
    };
  };

  const setRef = (el: HTMLElement, key: string) => {
    formElementRefs.current![key] = el!;
  };

  const scrollToFormElement = (key: string) => {
    console.log(`scrollToFormElement: ${key}`);
    formElementRefs.current[key].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  const focusWhenInvalid = (el: HTMLInputElement|null) =>  {
    if (!el) {
      return;
    }
      setRef(el, el.name);
      if (
        Object.values(shouldNotScrollConditions(el.name)).some(
          (condition) => condition,
        )
      ) {
        return;
      }

      scrollToFormElement(el.name);

  };

  return { focusWhenInvalid };
};
export default useFormElementRefs;
