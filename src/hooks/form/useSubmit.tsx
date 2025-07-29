import { useEffect, useState } from "react";

const useSubmit = (onSubmit: (e: React.FormEvent) => void) => {
  const [submitAttempted, setSubmitAttempted] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmitAttempted((prev) => prev + 1);

    onSubmit(e);
  };

  return {
    isSubmitted,
    submitAttempted,
    handleSubmit,
  };
};

export default useSubmit;
