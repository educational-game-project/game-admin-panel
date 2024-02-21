export const transformStringPlus = (input: string | undefined): string => {
  if (input === undefined) {
    return '';
  }
  return input.replace(/\s+/g, '+');
};

export const extractNameParts = (fullName: string | undefined) => {
  if (fullName === undefined) {
    return {
      firstName: '',
      lastName: '',
    };
  }

  const nameParts = fullName.split(' ');
  if (nameParts.length === 2) {
    return {
      firstName: nameParts[0],
      lastName: nameParts[1],
    };
  } else if (nameParts.length > 2) {
    const firstName = nameParts.slice(0, -1).join(' ');
    const lastName = nameParts[nameParts.length - 1];
    return {
      firstName: firstName,
      lastName: lastName,
    };
  } else {
    return {
      firstName: fullName,
      lastName: '',
    };
  }
};
