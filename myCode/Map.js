let m2 = new Map().set('1', 'one').set('2', 'two')

for (let key of m2.keys()) {
    console.log(key); // 1  2 
}

for (let value of m2.values()) {
    console.log(value); // one two
}

for (let item of m2.entries()) {
    console.log(item[0], item[1]); // 1 one ;2 two
}


for (let [key, value] of m2) {
    console.log(key, value); // 1 one ;2 two
}

console.log(m2[Symbol.iterator] === m2.entries)  // true


m2.forEach((value,key)=>{
    console.log(`key是：${key}，value是：${value}`)
})




