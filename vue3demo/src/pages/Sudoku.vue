<template>
    <div class="total">
        <div class="body">
            <div class="line" v-for="(item, i) in numArr" :key="i">
                <div class="lattice" v-for="(num, j) in item" :class="[i > 0 ? 'no-top' : '', j > 0 ? 'no-left' : '']"
                    :key="j + 100">
                    {{num}}
                    <div v-if="i > 0 && j > 0" class="mask"></div>
                    <div :class="[[2, 5].includes(i) ? 'bottom-border' : '']"></div>
                    <div :class="[[2, 5].includes(j) ? 'right-border' : '']"></div>

                </div>
            </div>
        </div>
        <div class="num-wraper">
            <div class="wraper" v-for="i in 9" :key="i + 10">
                <div class="num">{{ i }}</div>
                <div class="reset">{{ restNum[i] }}</div>
            </div>
        </div>
        <div class="tools">
            <div v-for="item in iconList" :key="item.name" class="iconfont" :class="item.name"
                @click="item.methods(item)">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue";
let numArr = reactive(numArrGenerator())
let restNum = reactive(restNumGenerator())

function restNumGenerator() {
    let obj = {}
    for (let i = 1; i < 10; i++) {
        obj[i] = null
    }
    return obj
}
function numArrGenerator() {
    let arr = new Array(9);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(9).fill(null);
    }
    return arr
}

const iconList = [
    {
        name: 'icon-bianji',
        tooltip: '编辑',
        methods: function handleEdit() {
        }
    },
    {
        name: 'icon-cha',
        tooltip: '删除',
        methods: function handleDelete(item) {
            console.log(item)
        }
    },
    {
        name: 'icon-shuaxin',
        tooltip: '重新开始',
        methods: function handleRestart() {
            console.log('handleRestart')
        }
    },
    {
        name: 'icon-zhuti_tiaosepan',
        tooltip: '主题更改',
        methods: function handleThemeChange() { }
    },
    {
        name: 'icon-chexiao',
        tooltip: '撤销',
        methods: function handlerevocation() { }
    },
    {
        name: 'icon-duigou',
        tooltip: '检查',
        methods: function handleCheck() {
            console.log('handleCheck')
        }
    },
    {
        name: 'icon-shezhi',
        tooltip: '设置',
        methods: function handleSetting() { }
    },
]

function init(curNum = 1, row = 0, triedCol = []) {
    var col = Math.floor(Math.random() * 9)
    if (rowVerity(curNum, row) && colVerity(curNum, col) && quareVerity(curNum, row, col) ) {
        if (curNum <= 9 && row < 8) {
            numArr[row][col] = curNum
            row++
            init(curNum, row)
            return
        }
        if (curNum < 9 && row === 8) {
            numArr[row][col] = curNum
            curNum++
            init(curNum, 0)
            return
        }
        if (curNum === 9 && row === 8) {
            numArr[row][col] = curNum
            return
        }
    }
    if (!rowVerity(curNum, row)|| !colVerity(curNum, col) || !quareVerity(curNum, row, col) ) {
        if (!triedCol.includes(col)) {
            triedCol.push(col)
            // 有三种可能，一是随机列取得不对，导致得，需要生成新的列，这个情况，需要循环没一个列。 // 这儿应该会有剪枝的情况，可以优化
            init(curNum, row, triedCol)
        } else if (triedCol.includes(col) && triedCol.length < 9) {
            init(curNum, row, triedCol)
        }

        if (triedCol.length === 9) {
            // 第二中情况是在上边每个列都循环了还不行的情况下，需要回退上一行，并删除上一行中的curNum
            if (row > 0) {
                row--
                let index = numArr[row].findIndex(item=>item ===curNum)
                numArr[row].splice(index, 1)
                init(curNum, row)
            }

            // 第三种可能是，这个row减到0了，还不合适 ,需要将上一个数据重排// 不对，就两种可能
            if (row === 0) {
                curNum--
                let index = numArr[8].findIndex(item=>item ===curNum)
                numArr[8].splice(index, 1)
                init(curNum, row)
            }
        }
    }
}

function rowVerity(curNum, row) {
    return !numArr[row].includes(curNum) 
}// 行验证,返回true表示验证通过
function colVerity(curNum, col) {
    let arr = []
    for (let i = 0; i < col; i++) {
        arr.push(numArr[i].findIndex(item=>item === curNum))
    }
    return !arr.includes(col)
} // 列验证,当前这一列中没有当前值,返回true表示验证通过
function quareVerity(curNum, row, col) {
    let arr = []
    let isF0 = Number.isInteger(col / 3)  // 如果是整数向前0列
    let isF1 = (col / 3).toString().slice(2, 3) === '3' // 向前走1列
    let isF2 = (col / 3).toString().slice(2, 3) === '6' // 向前走2列
    let isU0 = Number.isInteger(row / 3) // 向上走0行
    let isU1 = (row / 3).toString().slice(2, 3) === '3' // 向上走1行
    let isU2 = (row / 3).toString().slice(2, 3) === '6' // 向上走2行

    if(isU0 && isF0){
        for (let r = row; r < row + 3; r++) { // 行向下走2行
            for (let c = col; c < col + 3; c++) { //  列向右走2列
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU0 && isF1){
        for (let r = row; r < row + 3; r++) { // 行向下走2行
            for (let c = col-1; c < col + 2; c++) { //  列向左右各走1列
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU0 && isF2){
        for (let r = row; r < row + 3; r++) { // 行向下走2行
            for (let c = col-2; c < col + 1; c++) { //  列向左走2列
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU1 && isF0){
        for (let r = row-1; r < row + 2; r++) { 
            for (let c = col; c < col + 3; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU1 && isF1){
        for (let r = row-1; r < row + 2; r++) { 
            for (let c = col-1; c < col + 2; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU1 && isF2){
        for (let r = row-1; r < row + 2; r++) { 
            for (let c = col-2; c < col + 1; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU2 && isF0){
        for (let r = row-2; r < row + 1; r++) { 
            for (let c = col; c < col + 3; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU2 && isF1){
        for (let r = row-2; r < row + 1; r++) { 
            for (let c = col-1; c < col + 2; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    if(isU2 && isF2){
        for (let r = row-2; r < row + 1; r++) { 
            for (let c = col-2; c < col + 1; c++) { 
                arr.push(numArr[r][c])
            }
        }
    }
    return !arr.includes(curNum)
} // 3*3验证 ,返回true表示验证通过

onMounted(() => {
    init()
})



</script>

<style lang="scss" scoped>
.total {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fff;
    margin-top: 50px;
    align-items: center;
    justify-content: space-evenly;

    .body {
        width: 50%;

        .line {
            display: flex;

            .lattice {
                position: relative;
                width: 80px;
                height: 80px;
                border: 1px solid rgb(211, 204, 204);
                text-align: center;
                line-height: 80px;

                .mask {
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                    position: absolute;
                    top: -5px;
                    left: -5px;

                }

                .bottom-border {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    z-index: 10;
                    width: 81px;
                    height: 2px;
                    background-color: red;
                }

                .right-border {
                    position: absolute;
                    right: -1px;
                    top: 0;
                    z-index: 11;
                    height: 81px;
                    width: 2px;
                    background-color: red;
                }
            }

            .no-left {
                border-left: none;
            }

            .no-top {
                border-top: none;
            }
        }



    }

    .num-wraper {
        width: 20%;

        .wraper {
            width: 160px;
            height: 69px;
            border-radius: 10px;
            border: 1px solid rgb(211, 204, 204);
            text-align: center;
            line-height: 69px;
            display: flex;
            font-size: 22px;
            margin: 10px 0;

            .num {
                width: 100px;
                height: 69px;
                border-right: 1px solid rgb(211, 204, 204);
                font-weight: bold;
                font-size: 30px;
            }

            .reset {
                width: 59px;
            }
        }

    }

    .tools {
        width: 10%;
        height: 730px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>