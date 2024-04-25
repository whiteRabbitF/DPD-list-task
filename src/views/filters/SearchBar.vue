<template>
  <div class="search-container">
    <input type="text" v-model="searchQuery" @input="updateSearch" @keydown.enter="search" :class="{ 'search-active': searchQuery }" placeholder="Search...">
    <span class="search-icon" @click="search">
      <img src="/assets/search.svg" alt="Search">
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Searchbar',
  data() {
    return {
      searchQuery: ''
    };
  },
  mounted() {
    this.searchQuery = localStorage.getItem('searchQuery') || '';
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery.trim());
    },
    updateSearch() {
      localStorage.setItem('searchQuery', this.searchQuery);
    }
  }
});
</script>

<style scoped>
.search-container {
  position: relative;
  width: 900px;
}

input[type="text"] {
  width: 800px;
  height: 40px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 18pt;
}

input[type="text"]:focus {
  border-color: #2f3a27;
}

.search-icon {
  position: absolute;
  top: 60%;
  left: 87%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-active {
  background-color: rgba(105, 101, 101, 0.05);
}

</style>



