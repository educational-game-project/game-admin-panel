export const getColorLevel = (level: number, totalLevels: number) => {
	//   const colorPalette = [
	//     '#8AF26A',
	//     '#7BE05E',
	//     '#6CCD51',
	//     '#5DA944',
	//     '#4E9538',
	//     '#40722B',
	//     '#315F1E',
	//     '#224D12',
	//     '#133A05',
	//     '#042802',
	//   ];
	//   const colorPalette = ['#8AF26A', '#6CCD51', '#4E9538', '#315F1E', '#133A05'];
	const colorPalette = ["#7BE05E", "#5DA944", "#315F1E"];

	// Ensure the level is within the color palette range
	const index = Math.max(0, Math.min(level - 1, colorPalette.length - 1));

	// If the number of levels is less than the color palette, use a subset of colors
	if (totalLevels <= colorPalette.length) {
		return colorPalette[index];
	}

	// If there are more levels than colors, cycle through the colors
	return colorPalette[index % colorPalette.length];
};
