<template>
    <div>
        <div>{{counter}}</div>
        <button @click="reset">Reset</button><br/><br/>
        <button @click="pause">Pause</button><br/><br/>
        <button @click="countDown">Continue</button>
    </div>
</template>

<script>
export default{
    data(){
        return{
            counter: 10,
            interval: null
        }
    },
    methods:{
        countDown(){
            this.interval = setInterval(() => {
                console.log("counting")
                if (this.counter > 0) this.counter--
                else clearInterval(this.interval)
            }, 1000)
        },
        reset(){
            clearInterval(this.interval)
            this.counter = 10
            this.countDown()
        },
        pause(){
            clearInterval(this.interval)
        },
    },
    created(){
        this.countDown()
    },
    beforeDestroy(){
        clearInterval(this.interval)
    }
}
</script>