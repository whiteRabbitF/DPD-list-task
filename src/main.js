import { createApp } from 'vue';
import App from './App.vue';
import router from './/router/router.js';
import { createPinia } from 'pinia';
import './style.css'
//import Antd from 'ant-design-vue';


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');


