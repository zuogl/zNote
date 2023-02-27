<template>
    <div>

    </div>
</template>

<script name="Sudoku" setup>
function a() {
    b();
}
function b() {
    let total = 0;
    for (let i = 0; i < 10 * 10000 * 10000; i++) {
        total += i;
    }
    console.log('b:', total);
}

a();


</script>

<style lang="scss" scoped></style>