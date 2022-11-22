let vnode = {
    tag: 'div',
    props: {
        onClick: () => { alert('hello') }
    },
    children: 'click me'
}

// function renderer(vnode, container) {
//     // 使用vnode.tag 作为标签名创建DOM元素
//     const el = document.createElement(vnode.tag)
//     // 遍历 vnode。props ,将属性、事件添加到DOM元素
//     for (const key in vnode.props) {
//         if (/^on/.test(key)) {
//             // 如果以on开头，说明是事件
//             el.addEventListener(key.substr(2).toLowerCase(),
//                 vnode.props[key] // 事件处理函数
//             )
//         }
//     }
//     // 处理children
//     if (typeof vnode.children === 'string') {
//         // 如果children是字符串，说明它是元素的文本子节点
//         el.appendChild(document.createTextNode(vnode.children))
//     } else if (Array.isArray(vnode.children)) {
//         // 递归调用renderer函数渲染子节点，使用当前的el作为挂载点
//         vnode.forEach(child => renderer(child, el));
//     }
//     // 将元素添加到挂载点
//     container.appendChild(el)
// }


// const myComponent = function () {
//     return {
//         tag: 'div',
//         props: {
//             onClick: () => { alert('hello') }
//         },
//         children: 'click me'
//     }
// }

function renderer(vnode, container) {
    if (typeof vnode.tag === 'string') {
        // 说明vnode描述的是标签元素
        mountElement(vnode, container)
    } else if (typeof vnode.tag === 'function') {
        // 说明vnode描述的组件
        mountComponent(vnode, container)
    }
}

function mountComponent(vnode, container) {
    // 调用组件函数，获取描述组件的虚拟DOM
    const subtree = vnode.tag()
    // 递归调用renderer函数，渲染subtree,  这儿之所以递归调用renderer，是因为组件是可以嵌套的，返回的subtree中有可能还有其他组件
    renderer(subtree, container)
}

// const myComponent = {
//     render() {
//         return {
//             tag: 'div',
//             props: {
//                 onClick: () => { alert('hello') }
//             },
//             children: 'click me'
//         }
//     }

// }


// function render(){
//     return{
//         tag: 'div',
//         props: {
//            id:'foo',
//            class:'cls'
//         },
//     },
//     patchFlags:1//假设数字1代表class是动态的
// }


// let val = 1 ; // 全局变量
// function effect(){
//     val = 3
// }