export const useAlert = (message, title = null, onClose = null) => {
    const modal = useState('modal'); 
    modal.value = {
        type: 'alert',
        message,
        title,
        confirm: false,
        show: true,
        onClose
    };
    return modal;
}