const handleBlogRouter = (req, res) => {
    const method = req.method; //GET POST
    const url = req.url;
    const path = url.split('?')[0];
    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        return {
            msg: 'GET_获取博客列表api'
        }
    }
    //获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: 'POST_获取博客详情的api'
        }
    }
    //新建一篇博客
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: 'POST_新建博客的api'
        }
    }
}
module.exports = handleBlogRouter
