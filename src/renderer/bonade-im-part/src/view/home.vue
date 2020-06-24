<!--
 * @Descripttion: 
 * @version: 
 * @Author: YanQi
 * @Date: 2020-06-24 18:05:08
 * @LastEditors: YanQi
 * @LastEditTime: 2020-06-24 18:09:51
--> 
<template>
    <div>
        <div class="drag">拖动窗口呵呵</div>
        <div @click="max">最大化</div>
        <div @click="min">最小化1</div>
    </div>
    
</template>

<script>
export default {
    name: 'home',
    methods: {
        max(){
            console.log('最大')
            ipcRenderer && ipcRenderer.send('maximization')
        },
        min(){
            ipcRenderer && ipcRenderer.send('minimize')
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>