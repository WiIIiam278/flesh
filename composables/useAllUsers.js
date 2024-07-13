export const useAllUsers = async (pageNo, pageSize) => {
    const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
    
    const { auth, xsrf } = useAuth();
    const { data } = await useFetch(`${BASE_URL}/v1/users`, {
        method: 'GET',
        credentials: auth ? 'include' : 'omit',
        params: {
            page: pageNo,
            size: pageSize
        },
        headers: {
            'Cookie': `JSESSIONID=${auth}; XSRF-TOKEN=${xsrf}`,
            'X-XSRF-TOKEN': xsrf
        },
    });

    return data;
}