import { reqAddCart, reqCartList, reqUpdateCartChecked } from '@/api'
import { isCancel } from 'axios'

const state = {
    shopCartList: []
}

const mutations = {
    RECEIVESHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}

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
    },

    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code === 200) {
            commit('RECEIVESHOPCARTLIST', result.data)
        }
    },

    async updateCartChecked({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateCartChecked(skuId, isChecked)

        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    // dispatch的本质就是调用函数，{commit}这个对象就是store对象
    async updateCartCheckedAll({ commit, dispatch, state }, isChecked) {
        let promises = []
        state.shopCartList.forEach(item => {
            // 表示如果当前的ischecked和点击的一样，那么就不改变了，少发一次请求
            if (item.isChecked === isChecked) return
            let promise =  dispatch('updateCartChecked', { skuId: item.skuId, isChecked })
            promises.push(promise)
        });

        // Promise.all是一个方法（函数）
        // 参数：一个Promise对象的数组
        // 返回值：一个新的Promise对象，
        // 新的Promise对象状态是成功还是失败：如果Promise对象的数组当中有一个失败，那么状态就是失败，原因就是第一个失败Promise的原因
        // 如果Promise对象的数组当中没有失败，那么状态就是成功，成功的结果就是所有Promise成功的结果组成的数据

        // Promise.all返回的也是Promise，他这里返回的是Promise.all的结果，（同样也是一个Promise）
        return Promise.all(promises)
    }
}

export default {
    state,
    mutations,
    actions,

}