<template>
  <div class="filter-panel">
    <button @click="toggleFilter">Country
      <img v-if="!showFilter" src="/assets/filter.svg" alt="filter">
      <img v-else src="/assets/close.svg" alt="close">
    </button>
    <div v-if="showFilter" class="country-select-container">
      <select v-model="selectedCountry" @change="applyFilter" class="country-select">
        <option value="">All countries</option>
        <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CountryFilter',
  props: {
    countries: {
      type: Array as () => string[],
      required: true,
    },
  },
  data() {
    return {
      selectedCountry: '',
      showFilter: false,
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter', { country: this.selectedCountry });
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
  },
});
</script>

<style scoped>
.filter-panel {
  position: relative;
  z-index: 10;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16pt;
}

.country-select-container {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  overflow: hidden;
}

.country-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  height: fit-content;
  transition: border-color 0.3s ease;
  background-color: #fff;
  appearance: none;
}

.country-select:hover {
  border-color: #007bff;
}

select {
  background-repeat: no-repeat;
  background-position: right 8px top 50%;
  padding-right: 30px;
}

option {
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}

option:hover {
  background-color: #f2f2f2;
}
</style>


