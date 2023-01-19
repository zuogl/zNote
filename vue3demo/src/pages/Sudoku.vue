<template>
    <div class="total">
        <div class="body">
            <div class="line" v-for="i in 9" :key="i">
                <div class="lattice" :class="[i > 1 ? 'no-top' : '', j > 1 ? 'no-left' : '']" v-for="j in 9 "
                    :key="j * i">
                    {{ i }} {{ j }}
                    <div v-if="i >1 && j > 1" class="mask"></div>
                </div>
            </div>
        </div>
        <div class="num-wraper">
            
        </div>
        <div class="tools"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";

</script>

<style lang="scss" scoped>
.total {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fff;
    margin-top: 50px;
    align-items: center;
    // border: 1px solid red;
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
            }

            .no-left {
                border-left: none;
            }

            .no-top {
                border-top: none;
            }
        }


    }
}
</style>