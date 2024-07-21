/* 
保存用户token
*/
export function saveToken(token) {
    window.localStorage.setItem('TOKEN_KEY', token)
}

/* 
读取用户信息
*/
export const getToken = () => localStorage.getItem('TOKEN_KEY')

/* 
删除用户信息
*/
export const removeToken = () => localStorage.removeItem('TOKEN_KEY')