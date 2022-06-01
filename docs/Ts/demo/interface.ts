(function() {
	// 描述一个对象的类型
	type myType = {
		name: string;
		age: number;
	};

	//接口用来定义一个类结构,用类定义一个类中应该包含哪些属性和方法
	// 同时也可以当成类型声明去使用

	interface myInterface {
		name: string;
		age: number;
	}
	interface myInterface {
		gender: string;
	}

	const obj: myInterface = {
		name: 'ddd',
		age: 123,
		gender: 'male'
	};

	// 接口可以在定义类的时候去限制类的结构，接口中所有的属性都不能有实际的值，所有的方法都是抽象方法（没有方法体）
	interface Person {
		age: number;
		name: string;
		run(): void;
	}

	// 定义类时，可以使类去实现一个接口，实现一个接口，就是使类满足接口的要求

	class MyPerson implements Person {
		age: number;
		name: string;
		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
		run() {
			console.log('我能跑就妙儿吧');
		}
	}
})();
