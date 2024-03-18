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

export const getRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const hexColor = '0'.repeat(6 - randomColor.length) + randomColor;

  return hexColor;
};

export const convertLevelLegend = (
  inputString: string | number | undefined,
  mode: 'short' | 'long'
) => {
  if (inputString === undefined) {
    return '';
  }
  const initialText = inputString.toString();
  const match = initialText.match(/lvl_(\d+)/);

  if (match) {
    if (mode === 'long') {
      const formattedString = `Level ${match[1]}`;
      return formattedString;
    } else if (mode === 'short') {
      const formattedString = `Lvl.${match[1]}`;
      return formattedString;
    }
  } else {
    return initialText;
  }
};

export const getItemUnit = (itemName: string): string => {
  const match = itemName.match(/\((.*?)\)/);
  if (match) {
    const valueInBrackets = match[1];
    if (valueInBrackets.toLowerCase().includes('score')) {
      return 'pts';
    } else {
      return '';
    }
  }

  return '';
};

export const getLabelCharts = (itemName: string | undefined): string => {
  if (itemName === undefined) {
    return '';
  }
  return itemName.replace(/\s*\([^)]*\)\s*/, '');
};
