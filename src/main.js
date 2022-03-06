import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'
// import './api/mock';
// router.beforeEach((to,from,next) => {
//   store.commit('getToken')
//   const token = store.state.user.token
//   if(!token&& to.name != 'login'){
//     next({name:'login'})
//   }
//   else
//     if(token && to.name == 'login'){
//       next({name:'home'})
//     }
  
//   else{
//     next()
//   }
// })




Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
 
  el: '#app',
  render: h => h(App)
})
