const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = (()=> {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 40 * 60 * 1000))
  console.error(d.toGMTString());
  return d.toGMTString()
})

//存放session数据
const SESSION_DATA = {}

// 处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}


const serverHandle = (req, res) => {
  // 设置返回json
  res.setHeader('Content-type', 'application/json')

  //获取path
  const url = req.url
  req.path = url.split('?')[0];

  //解析参数
  req.query = querystring.parse(url.split('?')[1]);

  //解析客户端cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''; //key1=value1;k2=v2;...
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  //解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  getPostData(req).then(postData => {
    req.body = postData
    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId};; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理 user 路由
    const userResult =  handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId};; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // //未处理的返回404
    res.writeHead(404, {"content-type": "text/plain"})
    res.write('404 Not Found\n')
    res.end()
  })


}

module.exports = serverHandle
