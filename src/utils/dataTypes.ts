type ExternalValues<T> = T & { [key: string]: any };

export const mergeValuesIfKeyExisted = <T extends object>(
  values: T,
  externalValues: ExternalValues<T>,
): T => {
  let newValues = { ...values };
  Object.keys(externalValues).forEach((key) => {
    if (key in newValues) {
      newValues = {
        ...newValues,
        [key]: externalValues[key as keyof typeof externalValues],
      };
    }
  });
  return newValues;
};
