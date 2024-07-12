const AUTH_COOKIE = "JSESSIONID";
const XSRF_COOKIE = "XSRF-TOKEN";

export const useAuth = () => {
    const auth = useCookie(AUTH_COOKIE, { httpOnly: false });
    const xsrf = useCookie(XSRF_COOKIE, { httpOnly: false });

    if (import.meta.server) {
        auth.value = useCookie(AUTH_COOKIE, { httpOnly: false, value: auth.value }).value;
        xsrf.value = useCookie(XSRF_COOKIE, { httpOnly: false, value: xsrf.value }).value;
        useState('auth', () => auth.value);
        useState('xsrf', () => xsrf.value);
    } else if (import.meta.client) {
        auth.value = useState('auth').value;
        xsrf.value = useState('xsrf').value;
    }

    return { auth: auth.value, xsrf: xsrf.value };
}