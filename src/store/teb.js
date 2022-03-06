// import Cookies from "js-cookie"
export default {
    state: {
        isCollapse:false,
        tebList:[
            {
                path:"/",
                name:"home",
                label:"首页",
                icon:"home"
            }
        ],
        // menu:[],
        currentMenu:null
    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val) {
            if(val.name !== "home"){
                state.currentMenu =val
                const result = state.tebList.findIndex(item => item.name === val.name)
                if(result === -1) {
                        state.tebList.push(val)
                }
            }
                else{
                    state.currentMenu = null
                }
            
            
        },
        // closeTags(state,val){
        //     const result = state.tebList.findIndex(item=> item.name ==val.name)
        //     state.tebList.splice(result,1)
        // },
        // setMenu(state,val){
        //     state.menu = val
        //     Cookies.set('menu',val)
        // },
        // clearMenu(state){
        //     state.menu = []
        //     Cookies.remove('menu')
        // },
    },
}