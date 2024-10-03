export const useConfirm = (message, title = null, onClose = null, markdown = false) => {
    const modal = useState('modal');
    modal.value = {
        type: 'confirm',
        message,
        title,
        markdown: markdown,
        confirm: false,
        show: true,
        onClose
    };
    return modal;
}