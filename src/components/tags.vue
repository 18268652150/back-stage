<template>
    <div id="tags" >
        <!-- {{tags}} -->
        <!-- {{$route}} -->
            <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name!=='home'"
            :effect="$route.name==tag.name?'dark':'light'"
             @click="clickTag(tag)"
            @close="closeTag(tag,index)"
            >
            {{tag.label}}
            </el-tag>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name:'tags',
    computed: {
        // ...mapState(
        //     []
        // )
        // ...mapState({ tags: 'teb.tebList' })
        

        ...mapState({
            tags:state => state.teb.tebList
        })
    },
    methods:{
       
        ...mapMutations(
            ['closeTags']),
        clickTag(item){
            this.$router.push({name:item.name})
        },
        closeTag(tag,index){
            
            // let this = this
           const length = this.tags.length-1
           this.closeTags(tag) 
           if(tag.name!==this.$route.name) {
               return}
           if( index===length ) {
               this.$router.push({
                   name:this.tags[index-1].name
               })
            }
            else{
                   this.$router.push({
                   name:this.tags[index].name
               })
            }
           
           

        }
    },
   
}
</script>
<style lang="scss" scoped>
#tags{
    text-align: initial;
    .el-tag{
        margin-left: 20px;
        cursor: pointer;
    }
    .el-tag:first-child{
        margin-left: 0;
    }
}

</style>