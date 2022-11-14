let vnode = {
    tag: 'div',
    props: {
        onClick: () => { alert('hello') }
    },
    children: 'click me'
}

function renderer(vnode, container) {
    // 使用vnode.tag 作为标签名创建DOM元素
    const el = document.createElement(vnode.tag)
    // 遍历 vnode。props ,将属性、事件添加到DOM元素
    for (const key in vnode.props) {
        if (/^on/.test(key)) {
            // 如果以on开头，说明是事件
            el.addEventListener(key.substr(2).toLowerCase(),
                vnode.props[key] // 事件处理函数
            )
        }
    }
    // 处理children
    if (typeof vnode.children === 'string') {
        // 如果children是字符串，说明它是元素的文本子节点
        el.appendChild(document.createTextNode(vnode.children))
    } else if (Array.isArray(vnode.children)) {
        // 递归调用renderer函数渲染子节点，使用当前的el作为挂载点
        vnode.forEach(child => renderer(child, el));
    }
    // 将元素添加到挂载点
    container.appendChild(el)
}