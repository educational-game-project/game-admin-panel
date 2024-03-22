export const transformInteger = (input: number | undefined): number => {
	if (input === undefined) {
		return 0;
	}
	return Math.round(input);
};

export const transformPercentage = (input: number | undefined): string => {
	if (input === undefined) {
		return "0%";
	}
	return `${input.toFixed(1)}%`;
};

export const getPercentage = (
	input: number | undefined,
	total: number | undefined
): string => {
	if (input === undefined || total === undefined) {
		return "0";
	}
	if (total === 0) {
		return "0";
	}
	const percentValue = (input / total) * 100;
	return transformPercentage(percentValue);
};
