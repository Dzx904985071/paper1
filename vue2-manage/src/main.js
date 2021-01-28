import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/css/button.css';
import './components/common/directives';
import 'babel-polyfill';
import echarts from 'echarts' //引入echarts
import axios from 'axios'  //引入axios进行接口调用
import utils from './util';   //获取url参数
import '@/assets/css/iconfont/iconfont.css'
import wlSelect from './views/interface/index'
import alertMsg from './views/interface/alertMsg'
import wlSelects from './views/interface/indexs.js'
import wlSelectss from './views/interface/indexss.js'
import lbSelect from './views/interface/lbIndex'
import pageNation from './views/interface/pageNation'
import gsSelect from './views/interface/gsIndex.js'
import jcSelect from './views/interface/jcIndex.js'
import rySelect from './views/interface/ryIndex.js'
import rwlxSelect from './views/interface/rwlx.js'


Vue.use(wlSelect)
Vue.use(rwlxSelect)
Vue.use(alertMsg)
Vue.use(wlSelects)
Vue.use(wlSelectss)
Vue.use(lbSelect)
Vue.use(pageNation)
Vue.use(gsSelect)
Vue.use(jcSelect)
Vue.use(rySelect)
Vue.prototype.$utils = utils;
Vue.prototype.$echarts = echarts
Vue.prototype.$axios=axios
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
//console.log(i18n);
// var str=location.href;
//  this.$router.push({
//     path:'/src/components/components/yun.vue'
//  });
//  alert("11");
//alert(str);
/*
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 一码通云MES`;
    const role = localStorage.getItem('ms_username');
    alert(role);
    
    console.log(role);
    if (!role && to.path !== '/login') {
        next('/zltj');
        alert("1");
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
        alert("2");
    } else {

        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            
            next('/zltj');
            alert("3");
        }
    }
});*/

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
