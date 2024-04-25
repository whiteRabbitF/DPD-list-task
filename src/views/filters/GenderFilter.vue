<template>
  <div class="gender-filter">
    <button @click="toggleFilter" class="toggle">Gender
      <img v-if="!showFilter" src="/assets/filter.svg" alt="filter">
      <img v-else src="/assets/close.svg" alt="close">
    </button>
    <div v-if="showFilter" class="filters">
      <label class="filter-option">
        <input type="radio" v-model="selectedGender" value="all">
        All genders
      </label>
      <label class="filter-option">
        <input type="radio" v-model="selectedGender" value="male">
        Male
      </label>
      <label class="filter-option">
        <input type="radio" v-model="selectedGender" value="female">
        Female
      </label>
      <button class="apply" @click="applyFilter">Apply</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showFilter: false,
      selectedGender: null
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilter() {
      this.$emit('filter', { genders: [this.selectedGender] });
      this.showFilter = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.gender-filter {
  z-index: 10;
}

.toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16pt;
}

.filters {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 150px;
  height: 140px;
  background: #fcfcfc;
  border-radius: 20px;
  border: 1px solid grey;
  padding: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.filter-option input[type="radio"] {
  margin-right: 5px;
}

.apply {
  background: rgba(75, 86, 86, 0.3);
  border-radius: 20px;
  width: 100px;
  height: 50px;
  cursor: pointer;
}

.apply:hover {
  background: rgba(30, 89, 89, 0.3);
  color: white;
}

.toggle img {
  width: 24px;
  height: 24px;
}
</style>
