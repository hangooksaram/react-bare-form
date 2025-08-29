import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import TestForm from "@/test";
import useRefs from "@/hooks/form/useRefs";
import * as utilRef from "@/utils/ref";

describe("useRef", () => {
  let screen: ReturnType<typeof render>;
  let hook: ReturnType<typeof useRefs>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    screen = render(<TestForm />);
    user = userEvent.setup();
    hook = renderHook(() => useRefs()).result.current;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("should focus the first invalid input after validation failure", async () => {
    const firstInvalidInput = screen.getByLabelText("이메일");
    const submitButton = screen.getByRole("button", { name: "제출" });

    vi.spyOn(utilRef, "scrollToElement");

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(utilRef.scrollToElement).toBeCalledWith(firstInvalidInput);
    });
  });
});
