const fs = require('fs');
const path = require('path');


const vueArray = ['test', 'test2'] // 要生成的vue文件名称
const folderName = '../pages/Test' // 相对于这个文件的相对路径
// 文件夹路径
const folderPath = path.join(__dirname, folderName);

//  创建并写入内容
function writeVueFile(vueArray) {
    // 循环创建文件
    vueArray.forEach((fileName) => {
        // 文件内容
        const content = `<template>
    <div>
        This is ${fileName} 页面
    </div>
</template>

<script name="${fileName}" setup>

</script>

<style lang="scss" scoped>

</style>`;
        // 创建文件并写入内容
        fs.writeFileSync(path.join(folderPath, `${fileName}.vue`), content);
    });
}

// 验证文件夹是否存在
if (fs.existsSync(folderPath)) {
    writeVueFile(vueArray)
} else {
    // 如果文件夹不存在，则尝试创建它
    fs.mkdirSync(folderPath, { recursive: true });
    writeVueFile(vueArray)
}