export const transformStringPlus = (input: string | undefined): string => {
  if (input === undefined) {
    return '';
  }
  return input.replace(/\s+/g, '+');
};
