
// let data = { name: "小左同学" }


// 基本语法

// var proxy = new Proxy(targetObj,handler)


//  注意点
// 1.要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
// var pxy = new Proxy(data, {
//     get(target, key) {
//         return 35
//     }
// })

// console.log(pxy.name) // 35
// console.log(pxy.age) // 35
// console.log(data.name) // 小左同学
// console.log(data.age) // undefined


// 2. 如果handler没有设置任何拦截，那就等同于直接通向原对象。
// var p1 = new Proxy(data,{})
// console.log(p1.name) //  小左同学
// console.log(p1.age) // undefined
// console.log(data.name) // 小左同学
// console.log(data.age) // undefined





// 3. Proxy 实例也可以作为其他对象的原型对象。

// var p2 = new Proxy(data, {
//     get(target, key) {
//         return 35
//     }
// })


// let obj = Object.create(p2)
// console.log(obj.x) //35


//  Proxy 支持的包装 --放思维导图图片



// 1. Proxy.get()
// get方法用于包装某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名、 proxy 实例本身 准确的说是原始赋值行为所在的对象（可选）。

// var p3 = new Proxy(data, {
//     get(target, key) {
//         console.log('target', target)
//         console.log('key', key)
//         if (key in target) {
//             return target[key]
//         } else {
//             throw new ReferenceError(`${key} 不存在`)
//         }
//     }
// })

// console.log(p3.name)
// target { name: '小左同学' }
// key name
// 小左同学
// console.log(p3.age) // 抛出错误 ReferenceError: age 不存在




// get方法必须要遵守如下规则，否则proxy 会抛出 TypeError
// 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同。
// 如果要访问的目标属性没有配置访问方法，即 get 方法是 undefined 的，则返回值必须为 undefined。


// var obj = {};
// Object.defineProperties(obj, {
//     a: {
//         configurable: false,
//         enumerable: false,
//         value: 10,
//         writable: false
//     }, b: {
//         get:undefined
//     }
// });

// var p = new Proxy(obj, {
//     get: function (target, prop) {
//         return 20;
//     }
// });

// console.log(p.a) // TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '10' but got '20') //  在代理器的get方法上：a属性在代理目标上是只读且不可配置的属性，应该返回实际值10，而返回的是20
// console.log(p.b) // TypeError: 'get' on proxy: property 'b' is a non-configurable accessor property on the proxy target and does not have a getter function, but the trap did not return 'undefined' (got '20')  在代理器的get方法上：b属性在代理目标上是不可配置的，并且没有getter方法，应该返回undefined而得到的是20





// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
// var double = n => n * 2;
// var pow = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;
// var g = {
//     double,
//     pow,
//     reverseInt
// }

// var pipe = function (value) {
//     debugger
//     var funcStack = [];
//     var oproxy = new Proxy({}, {
//         get: function (pipeObject, fnName) {
//             if (fnName === 'get') {
//                 return funcStack.reduce(function (val, fn) {
//                     return fn(val);
//                 }, value);
//             }
//             funcStack.push(g[fnName]);
//             return oproxy;
//         }
//     });

//     return oproxy;
// }


// console.log(pipe(3).double.pow.reverseInt.get) // 63








//  2. Proxy.set()

// set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值 、 原始赋值行为所在的对象（可选）。

// 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
// let validator = {
//     set(target,key,value){
//         if(key ==='age'){
//             if(!Number.isInteger(value)){
//                 throw new TypeError('传入的age不是一个整数')
//             }
//             if(value > 200){
//                 throw new RangeError('传入的age超过200了')
//             }
//         }
//         target[key] = value
//         return true // 返回 true 代表属性设置成功。
//     }
// }


// let person  =  new Proxy({},validator);


// console.log(person.age = 50) // 50
// console.log(person.age = 100.25) //TypeError: 传入的age不是一个整数
// console.log(person.age = 'test') //TypeError: 传入的age不是一个整数
// console.log(person.age = 300) //RangeError: 传入的age超过200了




//  第4个参数的例子
// const handler = {
//     set: function(obj, prop, value, receiver) {
//       obj[prop] = receiver;
//       return true;
//     }
//   };
//   const proxy = new Proxy({}, handler);
//   proxy.foo = 'bar';
//   proxy.foo === proxy // true   receiver 指的是proxy本身



// const handler = {
//     set: function(obj, prop, value, receiver) {
//       obj[prop] = receiver;
//       return true;
//     }
//   };
//   const proxy = new Proxy({}, handler);
//   const myObj = {};
//   Object.setPrototypeOf(myObj, proxy);

//   myObj.foo = 'bar';
//   console.log(myObj.foo === myObj)    // true


// 如果违背以下的约束条件，proxy 会抛出一个 TypeError 异常：

// 若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。
// 如果目标属性没有配置存储方法，即 [[Set]] 属性的是 undefined，则不能设置它的值。
// 在严格模式下，如果 set() 方法返回 false，那么也会抛出一个 TypeError 异常。

// const obj = {};
// Object.defineProperty(obj, 'foo', {
//   value: 'bar',
//   writable: false
// });

// const handler = {
//   set: function(obj, prop, value, receiver) {
//     obj[prop] = value;
//     return true;
//   }
// };

// const proxy = new Proxy(obj, handler);
// proxy.foo = 'baz'; // TypeError: 'set' on proxy: trap returned truish for property 'foo' which exists in the proxy target as a non-configurable and non-writable data property with a different value
// // console.log(proxy.foo)


// const obj = {};
// Object.defineProperty(obj, 'foo', {
//   set:undefined
// });

// const handler = {
//   set: function(obj, prop, value, receiver) {
//     obj[prop] = value;
//     return true;
//   }
// };

// const proxy = new Proxy(obj, handler);
// proxy.foo = 'baz'; // TypeError: 'set' on proxy: trap returned truish for property 'foo' which exists in the proxy target as a non-configurable and non-writable accessor property without a setter


// 'use strict';
// const obj = {};
// Object.defineProperty(obj, 'foo', {
//     value: 'bar',
//     writable: true

// });

// const handler = {
//     set: function (obj, prop, value, receiver) {
//         obj[prop] = value;
//         return false;
//     }
// };

// const proxy = new Proxy(obj, handler);
// proxy.foo = 'baz';  //TypeError: 'set' on proxy: trap returned falsish for property 'foo'



// 3. Proxy.apply()

// apply方法拦截函数的调用、call和apply操作。

// apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

// var handler = {
//   apply (target, ctx, args) {
//     return Reflect.apply(...arguments);
//   }
// };
// 下面是一个例子。

// var target = function () { return 'I am the target'; };
// var handler = {
//   apply: function () {
//     return 'I am the proxy';
//   }
// };

// var p = new Proxy(target, handler);

// p()
// "I am the proxy"
// 上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。

// 下面是另外一个例子。

// var twice = {
//   apply (target, ctx, args) {
//     return Reflect.apply(...arguments) * 2;
//   }
// };
// function sum (left, right) {
//   return left + right;
// };
// var proxy = new Proxy(sum, twice);
// proxy(1, 2) // 6
// proxy.call(null, 5, 6) // 22
// proxy.apply(null, [7, 8]) // 30
// 上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。

// 另外，直接调用Reflect.apply方法，也会被拦截。

// Reflect.apply(proxy, null, [9, 10]) // 38



// 4. Proxy.has()

// var handler = {
//     defineProperty (target, key, descriptor) {
//       return false;
//     }
//   };
//   var target = {};
//   var proxy = new Proxy(target, handler);
//   proxy.foo = 'bar' // 不会生效

//   console.log(proxy.foo)


