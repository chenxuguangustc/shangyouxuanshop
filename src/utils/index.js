import {v4 as uuidv4} from 'uuid'

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


// 用于生成一个userTempId
export function getUserTempId () {
    let userTempId = localStorage.getItem('USERTEMPID_KEY')

    if (!userTempId) {
        userTempId = uuidv4()

        localStorage.setItem('USERTEMPID_KEY', userTempId)
    }

    return userTempId
}