const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: Date.now(),
      author: 'apidog'
    },
    {
      id: 2,
      title: '标题b',
      content: '内容b',
      createTime: Date.now(),
      author: 'apidog2'
    }
  ]
}

const getDetail = (id) => {
  return [{
    id: 1,
    title: 'detail',
    content: 'detail',
    createTime: Date.now(),
    author: 'detail'
  }]
}

const newBlog = (blogData = {}) => {
  console.error(blogData)
  return {
    id: 3
  }
}

const updateBlog = (id,blogData = {}) => {
  console.error('获取的id：', id)
  console.error('更新的参数：', blogData)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}
