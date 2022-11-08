//vue2 的响应式原理（简单版）

let getDouble = n=>n *2;
let obj = {}
let count = 1;
let double = getDouble(count);
// 该方法会直接在一个对象上定义 一个 新属性，或者修改一个对象的现有属性
Object.defineProperty(obj,'count',{
    get(){
        return count
    },
    set(val){
        count = val
        double = getDouble(val)
    }
})

console.log(double) // 2 
obj.count = 2
console.log(double) // 4 

delete obj.count
console.log(double) // 4 