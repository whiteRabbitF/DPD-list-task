<template>
  <a-modal :visible="showModal" title="Добавить сотрудника" @cancel="closeModal">
    <a-form
        @submit.prevent="addEmployee"
        :model="formData">
      <a-form-item label="Фамилия:" :required="true">
        <a-input
            :value="formData.surname"
            @input="formData.surname = $event.target.value"
        />
      </a-form-item>
      <a-form-item label="Имя:" :required="true">
        <a-input
            :value="formData.name"
            @input="formData.name = $event.target.value"
        />
      </a-form-item>
      <a-form-item label="Отчество:" :required="true">
        <a-input
            :value="formData.patronymic"
            @input="formData.patronymic = $event.target.value"
        />
      </a-form-item>
      <a-form-item label="Должность:" :required="true">
        <a-input
            :value="formData.position"
            @input="formData.position = $event.target.value"
        />
      </a-form-item>
      <a-form-item label="Телефон:" :required="true">
        <a-input
            v-mask="'+7 (###) ###-##-##'"
            :value="formData.phone"
            @input="formData.phone = $event.target.value"
        />
      </a-form-item>
      <a-form-item label="Почта:" :required="true">
        <a-input
            :value="formData.email"
            @input="formData.email = $event.target.value"
        />
      </a-form-item>
      <a-form-item>
        <a-button
            type="primary"
            html-type="submit"
            :disabled="!isFormValid"
            :class="{ 'button-enabled': isFormValid }">Добавить
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, computed } from 'vue';
import { mask } from 'vue-the-mask';
import api from '../services/api.js';

export default {
  directives: { mask },
  props: ['showModal'],
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      surname: '',
      patronymic: '',
      position: '',
      phone: '+7',
      email: ''
    });

    const isFormValid = computed(() => {
      return formData.value.name
          && formData.value.surname
          && formData.value.patronymic
          && formData.value.position
          && formData.value.phone
          && formData.value.email;
    });

    const addEmployee = async () => {
      try {
        console.log('Форма перед отправкой на бэкэнд:', formData.value);
        const response = await api.post('/', formData.value);
        emit('employee-added', response.data);
        formData.value.name = '';
        formData.value.surname = '';
        formData.value.patronymic = '';
        formData.value.position = '';
        formData.value.phone = '';
        formData.value.email = '';
        closeModal();
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    };

    const closeModal = () => {
      emit('close-modal');
    };

    return {
      formData,
      isFormValid,
      addEmployee,
      closeModal,
    };
  }
};
</script>

<style lang="scss" scoped>
.button-enabled {
  background-color: #52c41a;
  border-color: #52c41a;
}
</style>
