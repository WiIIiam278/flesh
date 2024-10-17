export const useInput = (message, title = "Input", inputText = null, inputValidator = null, onClose = null, markdown = false) => {
    const modal = useState('modal');
    modal.value = {
        type: 'input',
        message,
        title,
        markdown,
        inputText,
        show: true,
        inputValidator,
        onClose
    };
    return modal;
}