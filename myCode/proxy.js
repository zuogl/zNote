// *****************************************************************最简单的响应系统******************************************
// const bucket = new Set() // 存储副作用函数的桶

// const data = { text: "hello world!" } // 原始数据
// const obj = new Proxy(data, { // 对原始数据进行代理
//     get(target, key) {  // 拦截读取操作
//         bucket.add(effect) // 将副作用函数effectt添加到存储副作用函数的桶中
//         return target[key] // 返回属性值
//     },
//     set(target, key, newVal) { // 拦截设置操作
//         target[key] = newVal // 设置属性值
//         bucket.forEach(fn => fn()) // 把副作用函数从桶中取出来并执行
//         return true // 返回true表示设置成功
//     }
// })

// function effect() {
//     document.body.innerText = obj.text
// }

// effect()
// setTimeout(() => {
//     obj.text = 'hello vue3'
// }, 1000);





// ***********************************************************************************************************

// const bucket = new Set() // 存储副作用函数的桶
// const data = { text: "hello world!" } // 原始数据

// let activeEffect;
// function effect(fn) { // 用于注册副作用函数
//     activeEffect = fn;
//     fn()
// }


// const obj = new Proxy(data, {
//     get(target, key) {
//         if (activeEffect) {
//             bucket.add(activeEffect)
//         }
//         return target[key]
//     },
//     set(target, key, value) {
//         target[key] = value // 设置属性值
//         bucket.forEach(fn => fn()) // 把副作用函数从桶中取出来并执行
//         return true // 返回true表示设置成功
//     }
// })

// effect(()=>{
//     console.log('effect run');  // 控制台会输出两次，因为没有在副作用函数与被操作的目标字段之间建立明确的联系。导致了无论读取/设置的是哪一个属性，都会导致副作用函数被执行。
//     document.body.innerText = obj.text
// })


// setTimeout(() => {
//     obj.noExist = 'hello vue3'
// }, 1000);




// *****************************************************************构建副作用函数和被操作字段间的联系******************************************
// const bucket = new WeakMap(); // 存储副作用函数的桶
// // debugger
// const data = { text: "hello world!" } // 原始数据

// let activeEffect;

// function effect(fn) {
//     activeEffect = fn;
//     fn()
// }

// const obj = new Proxy(data, {
//     get(target, key) {
//         if (!activeEffect) return target[key]; // 如果没有副作用函数，直接返回
//         let depsMap = bucket.get(target) // 从桶中取出target对应的副作用函数集合，因为同一个target往往会有多个值，所以depsMap是一个map类型， key==>effects
//         if (!depsMap) {
//             bucket.set(target, depsMap = new Map())  // 如果该不存在，就新建一个map赋值给depsMap,并和target建立联系
//         }
//         let deps = depsMap.get(key) // 从 depsMap中，根据key值读取相对应的函数集合，可能一个key对应多个effects，所以deps是一个Set类型
//         if (!deps) {
//             depsMap.set(key, deps = new Set()) // 如果该不存在，就新建一个Set赋值给deps,并和key建立联系
//         }
//         deps.add(activeEffect) // 将当前激活的副作用函数存储进桶里边
//         return target[key] // 返回对应的值
//     },
//     set(target, key, value) {
//         target[key] = value; // 将要设置的新值给 target
//         const depsMap = bucket.get(target) // 根据target从桶中取出depsMap
//         if (!depsMap) return // 如果不存在，直接返回
//         const effects = depsMap.get(key); // 根据key取出真正的副作用函数
//         effects && effects.forEach(fn => fn()) // 如果存在，执行副作用函数
//     }
// })


// effect(()=>{
//     console.log('effect run');  
//     document.body.innerText = obj.text
// })


// setTimeout(() => {
//     obj.noExist = 'hello vue3'
// }, 1000);

// ****************************封装以下********************


// const bucket = new WeakMap(); // 存储副作用函数的桶
// const data = { ok: true, text: 'hello world' }// 原始数据

// let activeEffect;

// function effect(fn) {
//     debugger
//     activeEffect = fn;
//     fn()
// }

// const obj = new Proxy(data, {

//     get(target, key) {
//         debugger
//         track(target, key)
//         return target[key]
//     },
//     set(target, key, value) {
//         target[key] = value
//         trigger(target, key)
//     }
// })

// function track(target, key) {
//     debugger
//     if (!activeEffect) return;
//     let depsMap = bucket.get(target)
//     if (!depsMap) {
//         bucket.set(target, depsMap = new Map())
//     }
//     let deps = depsMap.get(key)
//     if (!deps) {
//         depsMap.set(key, deps = new Set())
//     }
//     deps.add(activeEffect)
// }

// function trigger(target, key) {
//         debugger
//     const depsMap = bucket.get(target)
//     if (!depsMap) return
//     const effects = depsMap.get(key)
//     effects && effects.forEach(fn => fn())
// }

// effect(function effectFn() {
//     console.log('副作用函数执行啦')
//     document.body.innerText = obj.ok ? obj.text : 'not'
// })
// *********************分支切换与cleanUp*******************

const bucket = new WeakMap();

const data = { ok: true, text: 'hello world' }
let activeEffect;
function effect(fn) {

    const effectFn = () => {
        debugger
        // 调用cleanup函数完成清除工作
        cleanup(effectFn)
        // 但effectFn执行时，将其设置为当前激活的副作用函数
        activeEffect = effectFn;
        fn()
    }
    // activeEffect.deps用来存储所有与该副作用函数相关联的依赖集合
    effectFn.deps = []
    // 执行副作用函数
    effectFn()

}
function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
        const deps = effectFn.deps[i] // deps 是依赖集合
        deps.delete(effectFn) // 将effectFn从依赖集合中移除
    }
    effectFn.deps.length = 0
}

const obj = new Proxy(data, {
    get(target, key) {
        debugger
        track(target, key)
        return target[key]
    },
    set(target, key, value) {
        debugger
        target[key] = value
        trigger(target, key)
    }
})

function track(target, key) {
    if (!activeEffect) return;
    let depsMap = bucket.get(target)
    if (!depsMap) {
        bucket.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, deps = new Set())
    }
    deps.add(activeEffect)
    // deps 就是一个与当前副作用函数存在联系的依赖集合，将其添加到activeEffect.deps数组中
    activeEffect.deps.push(deps)
}

function trigger(target, key) {
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    const effectsToRun = new Set(effects)
    effectsToRun.forEach(effectFn => effectFn())

    // effects && effects.forEach(fn => fn()) //引入cleanup后，仍旧这么写，会导致无限循环，原因是因为用forEach来遍历Set时，如果一个值已经被访问过，但该值被删除并重新添加到集合，如果此时forEach没有结束，那么该值会被重新访问。
}


effect(function effectFn() {
    console.log('副作用函数执行啦')
    document.body.innerText = obj.ok ? obj.text : 'not'
})



//  **********************************嵌套得effect与effect栈*********************************
// 为什么effect函数要设计成可嵌套的，因为副作用函数是有肯能发生嵌套的，举例来说Vuejs中的渲染函数就是在effect中执行的。每一个组件都有自己的副作用函数，而组件是经常嵌套的。


// const bucket = new WeakMap();

// const data = { foo:true,bar:true }
// let activeEffect;
// function effect(fn) {

//     const effectFn = () => {
//         debugger
//         // 调用cleanup函数完成清除工作
//         cleanup(effectFn)
//         // 但effectFn执行时，将其设置为当前激活的副作用函数
//         activeEffect = effectFn;
//         fn()
//     }
//     // activeEffect.deps用来存储所有与该副作用函数相关联的依赖集合
//     effectFn.deps = []
//     // 执行副作用函数
//     effectFn()

// }
// function cleanup(effectFn) {
//     for (let i = 0; i < effectFn.deps.length; i++) {
//         const deps = effectFn.deps[i] // deps 是依赖集合
//         deps.delete(effectFn) // 将effectFn从依赖集合中移除
//     }
//     effectFn.deps.length = 0
// }

// const obj = new Proxy(data, {
//     get(target, key) {
//         debugger
//         track(target, key)
//         return target[key]
//     },
//     set(target, key, value) {
//         debugger
//         target[key] = value
//         trigger(target, key)
//     }
// })

// function track(target, key) {
//     if (!activeEffect) return;
//     let depsMap = bucket.get(target)
//     if (!depsMap) {
//         bucket.set(target, depsMap = new Map())
//     }
//     let deps = depsMap.get(key)
//     if (!deps) {
//         depsMap.set(key, deps = new Set())
//     }
//     deps.add(activeEffect)
//     // deps 就是一个与当前副作用函数存在联系的依赖集合，将其添加到activeEffect.deps数组中
//     activeEffect.deps.push(deps)
// }

// function trigger(target, key) {
//     const depsMap = bucket.get(target)
//     if (!depsMap) return
//     const effects = depsMap.get(key)
//     const effectsToRun = new Set(effects)
//     effectsToRun.forEach(effectFn => effectFn())

//     // effects && effects.forEach(fn => fn()) //引入cleanup后，仍旧这么写，会导致无限循环，原因是因为用forEach来遍历Set时，如果一个值已经被访问过，但该值被删除并重新添加到集合，如果此时forEach没有结束，那么该值会被重新访问。
// }

// let temp1,temp;
// effect(function effectFn1() {
//     console.log('effectFn1执行')
//     effect(function effectFn2(){
//         console.log('effectFn2执行')
//         temp2 = obj.bar
//     })
//    temp1 = obj.foo
// })