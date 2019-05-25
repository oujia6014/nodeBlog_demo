const handleUserRouter = (req, res) => {
    const method = req.method; //GET POST
    const url = req.url;
    const path = url.split('?')[0];
    //登录
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: 'POST_登录的api'
        }
    }
}
module.exports = handleUserRouter
