export const useAllPosts = async (pageNo, pageSize, titleFilter) => {
    const BASE_URL = useRuntimeConfig().public.API_BASE_URL;

    const searchParams = { page: pageNo, size: pageSize };
    if (titleFilter?.length) {
        searchParams.nameSearch = titleFilter;
    }
    const { data } = await useFetch(`${BASE_URL}/v1/posts`, { params: searchParams });

    return data;
}