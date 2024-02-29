export const transformInteger = (input: number | undefined): number => {
  if (input === undefined) {
    return 0;
  }
  return Math.round(input);
};
