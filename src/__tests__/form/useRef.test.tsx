import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import TestForm from "@/components/Form.test";
import useRefs from "@/hooks/form/useRefs";
import * as utlRefFuncs from "@/utils/ref";

describe("useRef", () => {
  let screen: ReturnType<typeof render> = render(<TestForm />);
  let hook: ReturnType<typeof useRefs>;

  beforeEach(() => {
    vi.clearAllMocks();

    hook = renderHook(() => useRefs()).result.current;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("should scroll to the first invalid element after validation failure", async () => {
    const firstInvalidInput = screen.getByLabelText("이메일");
    const submitButton = screen.getByRole("button", { name: "제출" });

    vi.spyOn(utlRefFuncs, "scrollToElement");

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(utlRefFuncs.scrollToElement).toBeCalledWith(firstInvalidInput);
    });
  });

  it("should scroll to the first invalid element after validation failure, when elements are multiple", async () => {
    const validInputs = [
      {
        label: "이메일",
        value: "test@example.com",
      },
      {
        label: "이름",
        value: "sdfsdfsdf",
      },
      {
        label: "나이",
        value: 20,
      },
    ];

    for (const input of validInputs) {
      const inputElement = screen.getByLabelText(input.label);
      await userEvent.type(inputElement, String(input.value));
    }

    const firstInvalidInput = screen.getByLabelText("비밀번호");

    const submitButton = screen.getByRole("button", { name: "제출" });

    vi.spyOn(utlRefFuncs, "scrollToElement");

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(utlRefFuncs.scrollToElement).toBeCalledWith(firstInvalidInput);
    });
  });
});
