class Person {
	// 实例属性 -- 需要通过对象的实例去访问

	// readonly 开头的属性表示只读属性，不能修改
	readonly name: string = '孙悟空';
	age: number = 18;

	// 静态/类属性 可以直接通过类去使用
	static age: number = 20;
	static readonly Name: string = '猪八戒';

	// 方法也分为实例方法和类方法，区别方法和属性一样
	eat() {
		console.log('会吃饭');
	}
}

// const per = new Person();
// console.log('per', per);
// console.log(per.age); //18
// console.log(Person.age); // 20
// per.eat();

class Dog {
	name: string;
	age: number;
	// 构造函数，会在对象创建时被调用
	constructor(name: string, age: number) {
		// 在实例方法中，this就表示当前的实例
		// console.log('6666');
		this.name = name;
		this.age = age;
	}
	bark() {
		// 在方法中可以通过this来表示当前调用方法的对象
		console.log(this.name);
	}
	static eat() {
		console.log(this);
	}
}

// const dog = new Dog('小黑', 3);
// console.log(dog);
// dog.bark();
// const dog2 = new Dog('小黑2', 4);
// console.log(dog2);
// dog2.bark();

// Dog.eat();

// 继承
// 继承的子类拥有父类中的所有属性和方法
// 当子类中添加了和父类相同的方法，子类中的方法会直接覆盖父类中的同名方法，这种叫方法重写
(function() {
	// 以abstract开头的类叫抽象类，抽象类不能用来创建抽象类，抽象类中可以添加抽象方法
	abstract class Animal {
		// 属性修饰符
		/**
		 * public 修饰的属性可以在任意位置修改、访问 默认值
		 * private 修饰的属性只能在类内部进行访问，子类中不能访问
		 * protected 受保护的类， 在当前类和子类中可以访问
		 * 
		 * **/

		name: string;
		private age: number;
		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
		// 抽象方法使用abstract开头,没有方法体，抽象方法智能定义在抽象类中，子类必须对抽象类进行重写，不重写就会报错
		abstract bark(): void;
		//属性存取器
		setAge(value: number) {
			if (value > 0) {
				this.age = value;
			}
		}
	}

	// 定义一个表示狗的类，并继承Animal类，继承
	class Dog extends Animal {
		sex: string;
		constructor(name: string, age: number, sex: string) {
			// 如果在子类中写了构造函数，在子类构造函数中必须对父类构造函数进行调用
			super(name, age);
			this.sex = sex;
		}

		run() {
			console.log(`${this.name}在跑`);
		}

		bark(): void {
			// 在子类中，super就表示当前类的父类
			// super.bark();
			console.log('汪汪汪！');
		}
	}
	// 定义一个表示猫的类，并继承Animal类

	class Cat extends Animal {
		bark(): void {
			console.log('喵喵喵');
		}
	}

	const dog = new Dog('小黑', 5, 'male');
	const cat = new Cat('小白', 5);
	console.log(dog);
	dog.bark();
	dog.run();
	console.log(cat);
	cat.bark();

	class Person {
		name: string;
		age: number;
		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
	}

	// 语法糖 下边这个写法和上边的Person 作用一样
	class myPerson {
		constructor(public name: string, public age: number) {}
	}
})();
