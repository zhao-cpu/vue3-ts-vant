const AppID = 'wxc77c91bc281b3909';
const baseUrl =
    import.meta.env.VITE_BASE_API === '/api'
        ? '//swy.mnsn.cn'
        : import.meta.env.VITE_BASE_API;
const redirect_uri = document.location.protocol + baseUrl;
export const gotoWxAuth = (randStr: string) => {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppID}&redirect_uri=${encodeURIComponent(
        redirect_uri,
    )}&response_type=code&scope=snsapi_userinfo&state=${randStr}`;
};
