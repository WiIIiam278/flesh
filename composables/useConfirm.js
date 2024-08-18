export const useConfirm = (message, title = null, onClose = null) => {
    const modal = useState('modal');
    modal.value = {
        type: 'confirm',
        message,
        title,
        confirm: false,
        show: true,
        onClose
    };
    return modal;
}