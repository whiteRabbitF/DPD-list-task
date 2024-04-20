<template>
  <div>
    <a-row class="header">
      <a-col>
        <img src="../assets/logo.png" alt="">
      </a-col>
      <a-col>
        <h1>Список сотрудников организации "ООО Смартпойнт"</h1>
      </a-col>
    </a-row>
    <a-table :columns="columns" :dataSource="items">
      <template #name="{ record }">
        {{ record.surname }} {{ record.name }} {{ record.patronymic }}
      </template>
      <template #phone="{ record }">
        <span title="{{ record.phone }}">{{ record.phone }}</span>
      </template>
      <template #email="{ record }">
        <span title="{{ record.email }}">{{ record.email }}</span>
      </template>
      <template #action="{ record }">
        <a-button type="primary" class="ant-btn-danger" @click="deleteEmployee(record.id)">Удалить</a-button>
      </template>
    </a-table>
    <a-button type="primary" class="add" @click="openModal">Добавить сотрудника</a-button>
    <Modal :showModal="showModal" @close-modal="showModal = false" @employee-added="handleEmployeeAdded" />
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api.js';
import Modal from './Modal.vue';

export default {
  components: {
    Modal
  },
  setup() {
    const columns = [
      {
        title: 'ФИО сотрудника',
        dataIndex: 'name',
        key: 'name',
        slots: { customRender: 'name' }
      },
      {
        title: 'Должность',
        dataIndex: 'position',
        key: 'position'
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        slots: { customRender: 'phone' }
      },
      {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        slots: { customRender: 'email' }
      },
      {
        title: 'Действие',
        key: 'action',
        slots: { customRender: 'action' }
      }
    ];

    const items = ref([]);
    const showModal = ref(false);

    const openModal = () => {
      showModal.value = true;
    };

    const handleEmployeeAdded = (employee) => {
      items.value.push(employee);
    };

    const deleteEmployee = (id) => {
      api.delete(`/${id}`)
          .then(() => {
            items.value = items.value.filter(item => item.id !== id);
          })
          .catch(error => {
            console.error('Ошибка при удалении сотрудника:', error);
          });
    };

    const fetchData = async () => {
      try {
        const response = await api.get('/');
        items.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return {
      columns,
      items,
      showModal,
      openModal,
      handleEmployeeAdded,
      deleteEmployee
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  font-weight: 700;
  width: 1400px;
  margin: 0 auto 65px;
  text-align: center;
  position: relative;
}
.header img {
  max-width: 150px;
}

.header h1 {
  font-size: 36px;
  width: 1000px;
  text-align: center;
}
</style>






