import { ValidateResult } from "@/constants";

const useSubmit = (
  onSubmit: (e: React.FormEvent) => void,
  validateAll: () => ValidateResult
) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAll();
    if (result === ValidateResult.Invalid) {
      return;
    }

    onSubmit(e);
  };

  return {
    handleSubmit,
  };
};

export default useSubmit;
