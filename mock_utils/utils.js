export const parseURLParams = (url) => {
    const params = {};
    new URL(url).searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
};
