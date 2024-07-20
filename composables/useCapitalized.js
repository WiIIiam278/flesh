export const useCapitalized = (text) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
};