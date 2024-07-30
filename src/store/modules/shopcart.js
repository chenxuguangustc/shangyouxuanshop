import { reqAddCart } from '@/api'

const actions = {
    // {skuId,skuNum}是在解构用户传过来的对象
    async addCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddCart(skuId, skuNum)

        //    如果和以下写法一样，那么这个异步函数返回的Promise只有成功，
        //    if (result.code === '200') {
        //     return 'ok'
        //    } else {

        //    }

        // 这个写法让Promise有成功也有失败
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}

export default {
    
    actions,
  }