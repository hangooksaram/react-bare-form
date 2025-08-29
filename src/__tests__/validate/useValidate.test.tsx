import useValidate from "@/hooks/validate/useValidate";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Form from "../../components/Form.test";
import useRefs from "@/hooks/form/useRefs";
import { ValidateResult } from "@/constants";

const initValidateHook = (params: any, schema?: any) => {
  const { result } = renderHook(() => useValidate(params, schema));
  return result.current;
};

const initHooks = () => {
  const validateOff = initValidateHook({ name: "James" });
  const validateOn = initValidateHook(
    { name: "James" },
    { name: { required: { message: "Name is required" } } }
  );
  const wrongValidate = initValidateHook(
    { name: "" },
    { name: { required: { message: "Name is required" } } }
  );
  return { validateOff, validateOn, wrongValidate };
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
    hooks.validateOff.validate = vi.fn();
    const mockValidateFunc = hooks.validateOff.validate;

    expect(hooks.validateOff.isValidationOn).toBe(false);
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "James");
    expect(mockValidateFunc).not.toBeCalled();
  });

  it("should return invalid result when name is invalid", async () => {
    await userEvent.click(screen.getByText("Submit"));

    expect(hooks.wrongValidate.validate("name", "")).toBe(
      ValidateResult.Invalid
    );
    expect(hooks.validateOn.validateAll()).toBe(ValidateResult.Valid);
  });

  it("should return valid result when name is valid", async () => {
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "James");
    expect(hooks.validateOn.validate("name", "James")).toBe(
      ValidateResult.Valid
    );
  });
});
