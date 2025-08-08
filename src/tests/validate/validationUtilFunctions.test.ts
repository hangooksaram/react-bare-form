import { describe, expect, it } from "vitest";
import { invalid } from "../../utils/validate";

describe("is not required", () => {
  it("should return null when value is not required", () => {
    const result = invalid("some value", {
      required: { message: "This field is required" },
    });
    expect(result).toBeNull();
  });

  it("should return error message when value is required", () => {
    const result = invalid("", {
      required: { message: "This field is required" },
    });
    expect(result).toBe("This field is required");
  });
});

describe("is min", () => {
  it("should return null when value is greater than min", () => {
    const result = invalid(10, {
      min: { value: 5, message: "Value must be at least 5" },
    });
    expect(result).toBeNull();
  });

  it("should return error message when value is less than min", () => {
    const result = invalid(3, {
      min: { value: 5, message: "Value must be at least 5" },
    });
    expect(result).toBe("Value must be at least 5");
  });
});

describe("is max", () => {
  it("should return null when value is less than max", () => {
    const result = invalid(3, {
      max: { value: 5, message: "Value must be at most 5" },
    });
    expect(result).toBeNull();
  });

  it("should return error message when value is greater than max", () => {
    const result = invalid(10, {
      max: { value: 5, message: "Value must be at most 5" },
    });
    expect(result).toBe("Value must be at most 5");
  });
});

describe("is minLength", () => {
  it("should return null when string length is greater than minLength", () => {
    const result = invalid("hello", {
      minLength: { value: 3, message: "String must be at least 3 characters" },
    });
    expect(result).toBeNull();
  });

  it("should return error message when string length is less than minLength", () => {
    const result = invalid("hi", {
      minLength: { value: 3, message: "String must be at least 3 characters" },
    });
    expect(result).toBe("String must be at least 3 characters");
  });
});

describe("is regex", () => {
  it("should return null when string matches regex", () => {
    const result = invalid("abc123", {
      regex: { value: /^[a-z0-9]+$/, message: "String must match the pattern" },
    });
    expect(result).toBeNull();
  });
});
