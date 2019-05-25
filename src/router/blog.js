const {getList,getDetail,newBlog,updateBlog} = require('../controller/blog');
// const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method; //GET POST
  const url = req.url;
  const path = url.split('?')[0];
  const id = req.query.id;
  console.error('参数：',req.query);
  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || '';
    const keywork = req.query.keywork || '';
    const data = getList(author, keywork);
    return data
  }
  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const id = req.query.id || '';
    const data = getDetail(id);
    // return new SuccessModel(data);
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
}

module.exports = handleBlogRouter
