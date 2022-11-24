// let str = 'aabbcccc';
// let s = [...new Set(str)].join("")
// console.log("s",s)



// let s2 = new Set([2,3,5,6,9,8,8])
// console.log(s2.size)
// console.log(s2.length)


// let s3 = new Set([3,5,6,9])
// console.log(s3)

// console.log(s3.keys())

// console.log([3,6,5,3,6,9])

/**  Proxy   **/


// 感觉更多的是出现了一个新的对象，操作的时候都是操作新对象的，而不是旧的对象了。
// var obj = {
//     name: "小左同学",
//     age: 27,
//     hobby: 'sleep'
// }



// var obj = new Proxy(obj, {
//     get: (target, propKey, instance) => { // 被代理对象，属性值，被代理对象
//         console.log("target", target)
//         console.log("propKey", propKey)
//         console.log("instance", instance)
//         return target[propKey]
//     },
//     set: (target,propKey,value,instance) => {
//         console.log("target", target)
//         console.log("propKey", propKey)
//         console.log("value", value)
//         console.log("instance", instance)

//     }
// })


// console.log(obj.name)
// // console.log(oProxy.name)
// obj.age = 52
// console.log(obj.age)
// // oProxy.age = 60
// // console.log(oProxy.age)



var prosy = new Proxy({},{
    get:(item)=>{
     
    }
})
