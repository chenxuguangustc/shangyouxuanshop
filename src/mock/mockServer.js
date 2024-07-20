/* 
利用mockjs提供mock接口
*/

import Mock from 'mockjs'
import floor from './floor.json'
import recommends from './recommends.json'

// 提供今日接口
Mock.mock('/mock/recommends', {code: 200, data: recommends})

// 提供楼层接口
Mock.mock('/mock/floors', {code: 200, data: floor})

// 这个接口不需要向外面暴露任意东西，想使用这个接口只需要将这个模块加载到整个打包里面去就可以了，在main.js里面直接引入（关联）就可以了

// 这个模块被执行了，则下面的打印会输出
console.log('mock被调用了')


