export const useProjectStats = async (slug) => {
    const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
    
    const { data } = await useFetch(`${BASE_URL}/v1/projects/${slug}/stats`);
    
    return data;
}