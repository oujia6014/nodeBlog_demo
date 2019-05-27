const loginCheck = (username, password) => {
  console.error(username, password)
  // 先使用假数据
  if (username === 'abdog' && password === '123') {
    return true
  }
  return false
}
module.exports = {
  loginCheck
}
