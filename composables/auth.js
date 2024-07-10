const COOKIE_NAME = "JSESSIONID";

export const useAuth = () => {
    const cookie = useCookie(COOKIE_NAME, {
        //secure: true, // Uncomment this line when deploying to HTTPS prod server
        httpOnly: false,
    });
    // We do this to force Nuxt to update the cookie on the client side
    if (cookie.value && !cookie.value.startsWith("!")) {
        cookie.value = `!${cookie.value}`;
    }
    
    return cookie;
}