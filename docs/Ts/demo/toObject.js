var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person() {
        // 实例属性 -- 需要通过对象的实例去访问
        // readonly 开头的属性表示只读属性，不能修改
        this.name = '孙悟空';
        this.age = 18;
    }
    // 方法也分为实例方法和类方法，区别方法和属性一样
    Person.prototype.eat = function () {
        console.log('会吃饭');
    };
    // 静态/类属性 可以直接通过类去使用
    Person.age = 20;
    Person.Name = '猪八戒';
    return Person;
}());
// const per = new Person();
// console.log('per', per);
// console.log(per.age); //18
// console.log(Person.age); // 20
// per.eat();
var Dog = /** @class */ (function () {
    // 构造函数，会在对象创建时被调用
    function Dog(name, age) {
        // 在实例方法中，this就表示当前的实例
        // console.log('6666');
        this.name = name;
        this.age = age;
    }
    Dog.prototype.bark = function () {
        // 在方法中可以通过this来表示当前调用方法的对象
        console.log(this.name);
    };
    Dog.eat = function () {
        console.log(this);
    };
    return Dog;
}());
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
(function () {
    // 以abstract开头的类叫抽象类，抽象类不能用来创建抽象类，抽象类中可以添加抽象方法
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
            this.age = age;
        }
        //属性存取器
        Animal.prototype.setAge = function (value) {
            if (value > 0) {
                this.age = value;
            }
        };
        return Animal;
    }());
    // 定义一个表示狗的类，并继承Animal类，继承
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name, age, sex) {
            var _this = 
            // 如果在子类中写了构造函数，在子类构造函数中必须对父类构造函数进行调用
            _super.call(this, name, age) || this;
            _this.sex = sex;
            return _this;
        }
        Dog.prototype.run = function () {
            console.log("".concat(this.name, "\u5728\u8DD1"));
        };
        Dog.prototype.bark = function () {
            // 在子类中，super就表示当前类的父类
            // super.bark();
            console.log('汪汪汪！');
        };
        return Dog;
    }(Animal));
    // 定义一个表示猫的类，并继承Animal类
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.bark = function () {
            console.log('喵喵喵');
        };
        return Cat;
    }(Animal));
    var dog = new Dog('小黑', 5, 'male');
    var cat = new Cat('小白', 5);
    console.log(dog);
    dog.bark();
    dog.run();
    console.log(cat);
    cat.bark();
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    // 语法糖 下边这个写法和上边的Person 作用一样
    var myPerson = /** @class */ (function () {
        function myPerson(name, age) {
            this.name = name;
            this.age = age;
        }
        return myPerson;
    }());
})();
