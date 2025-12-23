import Vue from 'vue';
import App from './index.vue';
import Vant, { Toast, Dialog } from 'vant';
import moment from 'moment';

// 样式
import './index.css';

Vue.use(Vant);

// 全局 Mock 数据开关
Vue.prototype.$isMock = true;

// 全局过滤器
Vue.filter('formatDate', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!value) return '';
    return moment(value).format(format);
});

// Mock DaChenBridge
window.DaChenBridge = {
    getIdentity: (params, callback) => {
        callback({
            data: {
                openID: 'mock_openid',
                serialUDID: 'mock_udid',
                userName: '测试用户'
            }
        });
    },
    callClose: () => {
        console.log('Bridge: Close Page');
    },
    forwardToCommunity: (params) => {
        console.log('Bridge: Share to Community', params);
    }
};

new Vue({
    render: (h) => h(App),
}).$mount('#app');
