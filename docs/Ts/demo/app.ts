let a: string = 'Hello';
console.log(a);

let box1 = document.getElementById('box1');

// 这种写法在开启严格检查空值时，会报错

// box1.addEventListener('click',function(){
//     alert('Hello')
// })

if (box1 !== null) {
	box1.addEventListener('click', function() {
		alert('Hello');
	});
}
