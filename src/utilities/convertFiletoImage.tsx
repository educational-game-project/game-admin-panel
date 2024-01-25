export const convertFileToImage = (file: File): string | ArrayBuffer | null => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            
            return reader.result
        };
        reader.readAsDataURL(file);
    }

    return null
}