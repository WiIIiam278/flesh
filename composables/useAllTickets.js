export const useAllTickets = async (pageNo, pageSize) => {
    const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
    const searchParams = { page: pageNo, size: pageSize };

    const { auth, xsrf } = useAuth();
    const { data } = await useFetch(`${BASE_URL}/v1/tickets`, {
        method: 'GET',
        credentials: auth ? 'include' : 'omit',
        params: searchParams,
        headers: {
            'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
            'X-XSRF-TOKEN': xsrf
        }
    });

    return data;
}