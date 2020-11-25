export const updateObject = (olgObject, updatedProps) => {
  return {
    ...olgObject,
    ...updatedProps,
  };
};
