import { createRouter, createWebHistory } from 'vue-router';
import Table from '../components/Table.vue';

const routes = [
    {
        path: '/',
        component: Table,
        name: 'table'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;


