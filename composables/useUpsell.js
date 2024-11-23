export const useUpsell = (title, project) => {
    const modal = useState('modal');
    modal.value = {
        type: 'upsell',
        escapable: false,
        title,
        project,
        onClose: () => navigateTo(`/project/${project.slug}`),
        show: true
    };
    return modal;
}