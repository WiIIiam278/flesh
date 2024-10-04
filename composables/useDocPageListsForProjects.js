export const useDocPageListsForProjects = async (projects) => {
    const pages = {};
    for (const project of (projects.value?.filter(p => p.metadata.documentation) ?? [])) {
        pages[project.slug] = await useDocsPageList(project.slug);
    }
    return pages;
}