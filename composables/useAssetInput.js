export const useAssetInput = (message, title = "Select Asset", onClose = null) => {
    const modal = useState('modal');
    modal.value = {
        type: 'asset',
        escapable: false,
        message,
        title,
        inputText: null,
        show: true,
        onClose
    };
    return modal;
}