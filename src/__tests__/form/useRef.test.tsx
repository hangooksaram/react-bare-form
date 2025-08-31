import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import TestForm from "@/test";
import useRefs from "@/hooks/form/useRefs";
import * as utlRefFuncs from "@/utils/ref";

describe("useRef", () => {
  let screen: ReturnType<typeof render>;
  let hook: ReturnType<typeof useRefs>;

  beforeEach(() => {
    vi.clearAllMocks();
    screen = render(<TestForm />);
    hook = renderHook(() => useRefs()).result.current;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("should focus the first invalid input after validation failure", async () => {
    const firstInvalidInput = screen.getByLabelText("이메일");
    const submitButton = screen.getByRole("button", { name: "제출" });

    vi.spyOn(utlRefFuncs, "scrollToElement");

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(utlRefFuncs.scrollToElement).toBeCalledWith(firstInvalidInput);
    });
  });
});
