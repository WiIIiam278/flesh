export const useAlert = (message, title = null, onClose = null, markdown = false) => {
    const modal = useState('modal'); 
    modal.value = {
        type: 'alert',
        message,
        title,
        markdown,
        show: true,
        onClose
    };
    return modal;
}