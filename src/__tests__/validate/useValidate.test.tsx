import useValidate from "@/hooks/validate/useValidate";

import { describe, expect, it, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Form from "../../components/Form.test";

describe("if validateSchema is not defined, not execute validation", () => {
  it("should not execute validation", async () => {
    const { result } = renderHook(() => useValidate({ name: "hi" }));
    const screen = render(<Form />);
    result.current.validateAndUpdateError = vi.fn();

    await userEvent.type(screen.getByPlaceholderText("Enter name"), "hi");
    expect(result.current.validateAndUpdateError).not.toBeCalled();
  });
});
