import { createApp } from 'vue';
import App from './App.vue';
import router from './/router/router.js';
import './style.css'
import Antd from 'ant-design-vue';
//import 'ant-design-vue/dist/antd.css';


const app = createApp(App);
app.use(router);     // Подключение Vue Router
app.use(Antd);       // Подключение Ant Design Vue

app.mount('#app');


