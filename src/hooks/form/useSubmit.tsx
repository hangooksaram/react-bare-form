import { useEffect, useState } from "react";

const useSubmit = () => {
  const [submitAttempted, setSubmitAttempted] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleSubmitEvent = (e: Event) => {
      if (e.target instanceof HTMLFormElement) {
        setSubmitAttempted((prev) => prev + 1);
        setIsSubmitted(true);
      }
    };
    window.addEventListener("submit", handleSubmitEvent);
    return () => {
      window.removeEventListener("submit", handleSubmitEvent);
    };
  }, []);

  return {
    isSubmitted,
    submitAttempted,
  };
};

export default useSubmit;
