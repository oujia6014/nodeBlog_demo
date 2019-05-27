const {loginCheck} = require('../controller/user')
const handleUserRouter = (req, res) => {
  const method = req.method; //GET POST
  const url = req.url;
  const path = url.split('?')[0];
  // const query = req.query;
  //登录
  if (method === 'POST' && path === '/api/user/login') {
    const {username,passwork} = req.body
    const result = loginCheck(username,passwork)
    if (result) {
      return '登录成功'
    } else {
      return '登录失败'
    }
  }
}
module.exports = handleUserRouter
