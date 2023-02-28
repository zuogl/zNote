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

// let currentEffect;
// function effect(fn) { // 用于注册副作用函数
//     currentEffect = fn;
//     fn()
// }


// const obj = new Proxy(data, {
//     get(target, key) {
//         if (currentEffect) {
//             bucket.add(currentEffect)
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

// const bucket = new WeakMap();

// const data = { ok: true, text: 'hello world' }
// let activeEffect;
// function effect(fn) {
//     debugger

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


// effect(function effectFn() {
//     console.log('副作用函数执行啦')
//     document.body.innerText = obj.ok ? obj.text : 'not'
// })



//  **********************************嵌套得effect与effect栈--有问题版本*********************************
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

// 用以上代码进行测试时，当我们尝试修改obj.foo的值时，我们期望的是输出effectFn1执行，但是实际情况是输出值为effectFn2执行 ！ 问题出现在什么地方呢？就在于  我们用全局变量 activeEffect 来存储通过 effect 函数注册的副作用函数，这意味着同一时刻 activeEffect 所存储的副作用函数只能有一个。当副作用函数发生嵌套时，内层副作用函数的执行会覆盖 activeEffect 的值，并且永远不会恢复到原来的值。这时如果再有响应式数据进行依赖收集，即使这个响应式数据是在外层副作用函数中读取的，它们收集到的副作用函数也都会是内层副作用函数，这就是问题所在。



// ***************************************************嵌套得effect与effect栈--修复版******************************************
// const bucket = new WeakMap();

// const data = { foo:true,bar:true }
// let activeEffect;
// const effectStack = []
// function effect(fn) {

//     const effectFn = () => {
//         debugger
//         // 调用cleanup函数完成清除工作
//         cleanup(effectFn)
//         // 但effectFn执行时，将其设置为当前激活的副作用函数
//         activeEffect = effectFn;
//         effectStack.push(effectFn) // 在调用副作用函数时，将当前副作用函数压入栈中
//         fn()
//         effectStack.pop() // 当副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect还原为之前的值
//         activeEffect = effectStack[effectStack.length -1]
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


// **************************************避免无限递归***************************************************
// const bucket = new WeakMap();

// const data = { num: 1 }
// let activeEffect;
// const effectStack = []
// function effect(fn) {
//     const effectFn = () => {
//         debugger
//         // 调用cleanup函数完成清除工作
//         cleanup(effectFn)
//         // 但effectFn执行时，将其设置为当前激活的副作用函数
//         activeEffect = effectFn;
//         effectStack.push(effectFn) // 在调用副作用函数时，将当前副作用函数压入栈中
//         fn()
//         effectStack.pop() // 当副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect还原为之前的值
//         activeEffect = effectStack[effectStack.length - 1]
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

//     const effectsToRun = new Set()
//     effects && effects.forEach((effectFn) => {
//         if (effectFn !== activeEffect) {
//             effectsToRun.add(effectFn)
//         }
//     })

//     effectsToRun.forEach(effectFn => effectFn())
// }

// effect(() => {
//     obj.num++
//     console.log(obj)
// })



















// 
