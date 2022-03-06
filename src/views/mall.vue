<template>
    <div>我是商品管理</div>
</template>
<script>
// import axios from "axios"
export default {
//    async mounted(){
//    const time = await this.getData()
//         console.log(time)
//     },
mounted(){
    this.getData().then(res=>{
        console.log(res);
    })
},
    methods:{
        
        getData(){
          return new Promise((resolve)=>{
             
            setTimeout(()=>{
               resolve(123123)
            },2000)
    
            
        })
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>