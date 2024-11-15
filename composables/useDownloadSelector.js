export const useDownloadSelector = (title, data) => {
    const modal = useState('modal');
    modal.value = {
        type: 'download',
        title,
        data,
        show: true
    };
    return modal;
}