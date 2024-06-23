export const getImageSrc = (images: File[], index: number = 0) => {
    return images.length > 0
        ? images?.[index] && URL.createObjectURL(images[index])
        : '/placeholder.svg';
};