import {
  isNumber as isNumberGuard,
  isRegExp as isRegExpGuard,
  isString as isStringGuard,
} from "@/types/typeGuards";
import {
  ValidateFunction,
  ValidateInfoValue,
  ValidateSchemaValue,
} from "@/types/validate/util";

export const invalid = <T>(value: T, validateInfo: ValidateSchemaValue) => {
  const v = validate(value);
  const {
    required,
    min,
    max,
    minLength,
    maxLength,
    regex,
    isNumber,
    isString,
  } = validateInfo;

  if (isString) {
    if (!v.isString()) {
      return isString.message;
    }
  }

  if (isNumber) {
    if (!v.isNumber()) {
      return isNumber.message;
    }
  }

  if (required) {
    if (!v.isRequired()) {
      return required.message;
    }
  }

  if (min) {
    if (!v.isMin(Number(min.value!))) {
      return min.message;
    }
  }
  if (max) {
    if (typeof max.value === "number" && !v.isMax(max.value!)) {
      return max.message;
    }
  }
  if (minLength) {
    if (
      typeof minLength.value === "number" &&
      !v.isMinLength(minLength.value!)
    ) {
      return minLength.message;
    }
  }

  if (maxLength) {
    if (
      typeof maxLength.value === "number" &&
      !v.isMaxLength(maxLength.value!)
    ) {
      return maxLength.message;
    }
  }

  if (regex) {
    if (typeof regex.value !== "number" && !v.isRegexCorrect(regex.value!)) {
      return regex.message;
    }
  }
  return null;
};

const validate = <T>(value: T): { [key: string]: ValidateFunction } => {
  return {
    isRequired: () => {
      if (isStringGuard(value)) {
        return value.trim() !== "";
      }

      return value !== null && value !== undefined;
    },
    isRegexCorrect: (regex: ValidateInfoValue) => {
      if (!isStringGuard(value)) {
        return false;
      }
      if (isRegExpGuard(regex)) {
        return regex.test(value);
      }
      return false;
    },
    isMin: (min: ValidateInfoValue) => {
      if (isNumberGuard(value) && isNumberGuard(min)) {
        return value > min;
      }

      return false;
    },
    isMax: (max: ValidateInfoValue) => {
      if (isNumberGuard(value) && isNumberGuard(max)) {
        return value < max;
      }
      return false;
    },
    isMinLength: (minLength: ValidateInfoValue) => {
      if (isNumberGuard(minLength) && isStringGuard(value)) {
        return value.length >= minLength;
      }
      return false;
    },
    isMaxLength: (maxLength: ValidateInfoValue) => {
      if (isNumberGuard(maxLength) && isStringGuard(value)) {
        return value.length <= maxLength;
      }
      return false;
    },
    isString: () => {
      return isStringGuard(value);
    },
    isNumber: () => {
      return isNumberGuard(value);
    },
  };
};
