// 在定义函数或者类时，如果遇到类型不明确就可以使用泛型

function fn<K>(a: K): K {
	return a;
}

// 可以直接调用具有泛型的函数
let res1 = fn(10); //不指定泛型，TS可以自动对类型进行推断
let res2 = fn<string>('hello'); //指定泛型

// 泛型可以同时指定多个

function fn2<T, K>(a: T, b: K): T {
	console.log(b);
	return a;
}

fn2('2222', { name: 'test' });

interface Inter {
	length: number;
}


// T extends Inter 表示泛型T必须实现Inter类
function fn3<T extends Inter>(a: T): number {
	return a.length;
}



