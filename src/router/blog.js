const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog');
const handleBlogRouter = (req, res) => {
  const method = req.method; //GET POST
  const url = req.url;
  const path = url.split('?')[0];
  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || '';
    const keywork = req.query.keywork || '';
    const result = getList(author, keywork);
    return result.then(listdata =>{
      return JSON.parse(JSON.stringify(listdata))
    })
  }
  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id || '';
    const data = getDetail(id);
    return data
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    return newBlog(req.body)
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id,req.body)
    if(result){
      return '更新成功'
    } else {
      return '更新失败'
    }
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const result = delBlog(req.body)
    if(result){
      return '删除成功'
    } else {
      return '删除失败'
    }
  }

}

module.exports = handleBlogRouter
