export default (req, endpoint) => {
    let protocol = "http:";
    let host = req ? req.headers.host : window.location.hostname;
    return `${protocol}//${host}${endpoint}`;
};
