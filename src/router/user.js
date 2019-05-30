const {loginCheck} = require('../controller/user')


const getCookieExpires = (()=> {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 40 * 60 * 1000))
  console.error(d.toGMTString());
  return d.toGMTString()
})

const handleUserRouter = (req, res) => {
  const method = req.method; //GET POST
  const url = req.url;
  const path = url.split('?')[0];
  // const query = req.query;
  //登录
  // if (method === 'POST' && path === '/api/user/login') {
  //   const {username, passwork} = req.body
  //   const result = loginCheck(username, passwork)
  //   return result.then((data) => {
  //     if(data.username){
  //       data.state='登录成功'
  //       return data
  //     }else {
  //       return '登录失败'
  //     }
  //   })
  // }

  //get登录
  if (method === 'GET' && path === '/api/user/login') {
    const {username, passwork} = req.query
    const result = loginCheck(username, passwork)
    return result.then((data) => {
      if(data.username){
        data.state='登录成功:'+data.username;
        res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)//httpOnly 不允许前端改
        return data
      }else {
        return '登录失败'
      }
    })
  }


  if (method === 'GET' && path === '/api/user/cookie') {
    if(req.cookie.username){
      return  Promise.resolve('已有cookie登录成功'+req.cookie.username)
    }
    return  Promise.resolve('尚未登录')
  }



}
module.exports = handleUserRouter
