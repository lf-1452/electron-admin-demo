<template>
    <div>
        <div class="drag">拖动窗口</div>
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