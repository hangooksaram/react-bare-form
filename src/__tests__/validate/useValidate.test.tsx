import useValidate from "@/hooks/validate/useValidate";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Form from "../../components/Form.test";

describe("if validateSchema is not defined, not execute validation", () => {
  let hookResult: ReturnType<typeof useValidate>;
  beforeEach(() => {
    vi.clearAllMocks();
    const { result } = renderHook(() => useValidate({ name: "hi" }));
    hookResult = result.current;
  });

  it("should not execute validation", async () => {
    hookResult.validateAndUpdateError = vi.fn();
    const mockValidateFunc = hookResult.validateAndUpdateError;
    const screen = render(<Form />);

    expect(hookResult.isValidationOn).toBe(false);
    await userEvent.type(screen.getByPlaceholderText("Enter name"), "hi");
    expect(mockValidateFunc).not.toBeCalled();
  });
});
