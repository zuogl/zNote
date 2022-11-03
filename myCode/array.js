/**
 * @params {null || undefined || number} 需要比较的数据
 * @returns {number} 返回的最大值
 * **/
function getMax(...args) {
    let arr = new Array(...args).filter(i => typeof i === 'number')
    return Math.max.apply(null, arr)
}


const getArrayMaxWithApply = (arr) => Math.max.apply(null, arr)
const getArrayMaxWithMax = (arr) => Math.max(...arr)
const getArrayMaxWithSort = (arr) => arr.sort((a,b)=>b-a)[0]

console.log(getArrayMaxWithMax([100, 20, 30, undefined, -5]))
