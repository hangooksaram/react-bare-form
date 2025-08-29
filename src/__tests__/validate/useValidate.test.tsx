import useValidate from "@/hooks/validate/useValidate";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Form from "../../components/Form.test";
import useRefs from "@/hooks/form/useRefs";
import { ValidateResult } from "@/constants";
import { ValidateSchema } from "@/types/validate";

const invalidValidateFormValues = {
  name: "",
  age: 17,
};

const initValidateHook = (
  params: any,
  schema?: ValidateSchema<typeof invalidValidateFormValues>
) => {
  const { result } = renderHook(() => useValidate(params, schema));
  return result;
};

const initHooks = () => {
  const validateOff = initValidateHook({ name: "James" });
  const validateOn = initValidateHook(
    { name: "James" },
    { name: { required: { message: "Name is required" } } }
  );
  const invalidValidate = initValidateHook(
    { name: "", age: 17 },
    {
      name: { required: { message: "Name is required" } },
      age: {
        required: { message: "Age is required" },
        min: { value: 18, message: "Min age is 19" },
      },
    }
  );
  return { validateOff, validateOn, invalidValidate };
};

const mockScrollFunc = () => {
  const { result: refResult } = renderHook(() => useRefs());
  refResult.current.scrollToErrorElement = vi.fn();
};

const screen = render(<Form />);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("useValidate", () => {
  let hooks: ReturnType<typeof initHooks>;

  beforeEach(() => {
    vi.clearAllMocks();
    hooks = initHooks();
    mockScrollFunc();
  });

  it("should not execute validation when validate schema is not set", async () => {
    hooks.validateOff.current.validate = vi.fn();
    const mockValidateFunc = hooks.validateOff.current.validate;

    expect(hooks.validateOff.current.isValidationOn).toBe(false);
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "James");
    expect(mockValidateFunc).not.toBeCalled();
  });

  it("should return invalid result when name is invalid", async () => {
    await userEvent.click(screen.getByText("Submit"));

    expect(hooks.invalidValidate.current.validate("name", "")).toBe(
      ValidateResult.Invalid
    );
    expect(hooks.validateOn.current.validateAll()).toBe(ValidateResult.Valid);
  });

  it("should return valid result when name is valid", async () => {
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "James");
    expect(hooks.validateOn.current.validate("name", "James")).toBe(
      ValidateResult.Valid
    );
  });

  it("invalidField state should be updated when value is invalid", async () => {
    hooks.invalidValidate.current.validateAll();

    await waitFor(() => {
      expect(hooks.invalidValidate.current.invalidField).toEqual({
        name: "",
        age: 17,
      });
    });
  });
});
