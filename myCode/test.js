let str = 'aabbcccc';
let s = [...new Set(str)].join("")
console.log("s",s)



let s2 = new Set([2,3,5,6,9,8,8])
console.log(s2.size)
console.log(s2.length)


let s3 = new Set([3,5,6,9])
console.log(s3)

console.log(s3.keys())

console.log([3,6,5,3,6,9])