<template>
  <div class="page-container">
    <div class="table-container">
      <div class="filters-container">
        <h2>Filters</h2>
        <GenderFilter @filter="applyGenderFilter" />
        <CountryFilter :countries="userStore.countries" @filter="applyCountryFilter" />
      </div>
      <Searchbar @search="handleSearch" class="search" />
      <table v-if="paginatedData.length > 0" class="table">
        <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Date of birth</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(person, index) in paginatedData" :key="index">
          <td><img :src="person.picture.medium" alt="avatar-pic" /></td>
          <td>{{ person.name.title }} {{ person.name.first }} {{ person.name.last }}</td>
          <td>{{ person.gender }}</td>
          <td>{{ person.location.country }}</td>
          <td>{{ formatDate(person.dob.date) }}</td>
          <td>{{ person.email }}</td>
          <td>{{ person.phone }}</td>
        </tr>
        </tbody>
      </table>
      <div v-else class="no-results">
        no results found :(
      </div>
      <div v-if="userStore.loading" class="loading-indicator">
        Loading...
      </div>
      <div v-if="paginatedData.length > 0 || userStore.loading" class="pagination">
        <span class="pages">
          <span v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useUserStore } from '../store/store';
import Searchbar from '../views/filters/SearchBar.vue';
import GenderFilter from '../views/filters/GenderFilter.vue';
import CountryFilter from '../views/filters/CountryFilter.vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';

export default defineComponent({
  name: 'Table',
  components: {
    Searchbar,
    GenderFilter,
    CountryFilter,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const paginatedData = computed(() => userStore.paginatedData);
    const currentPage = computed(() => userStore.currentPage);
    const totalPages = computed(() => userStore.totalPages);

    const handleSearch = (query: string) => {
      userStore.handleSearch(query);
      updateURL();
    };

    const goToPage = (page: number) => {
      userStore.goToPage(page);
      updateURL();
    };

    const applyGenderFilter = (filterData: any) => {
      userStore.applyGenderFilter(filterData);
      updateURL();
    };

    const applyCountryFilter = (filterData: any) => {
      userStore.applyCountryFilter(filterData);
      updateURL();
    };

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    };

    const fetchData = async () => {
      try {
        userStore.loading = true;
        const response = await api.get('results');
        userStore.originalUsersData = response.data;
        userStore.usersData = userStore.originalUsersData.slice();
        userStore.extractCountries();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        userStore.loading = false;
      }
    };


    const updateURL = () => {
      router.replace({
        path: router.currentRoute.value.path,
        query: {
          search: userStore.searchQuery,
          page: userStore.currentPage.toString(),
        },
      });
    };

    onMounted(() => {
      fetchData();
      if (route.query.search) {
        userStore.handleSearch(route.query.search as string);
      }
      if (route.query.page) {
        userStore.goToPage(parseInt(route.query.page as string));
      }
    });

    return {
      userStore,
      paginatedData,
      currentPage,
      totalPages,
      handleSearch,
      goToPage,
      applyGenderFilter,
      applyCountryFilter,
      formatDate,
    };
  },
});
</script>



<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
}

.table-container {
  width: 70%;

  .search {
    margin: 20px auto;
  }
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 30px;
}

.table th {
  background-color: #f2f2f2;
}

.table td {
  border-radius: 5px;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pages {
  display: inline-block;
  margin-bottom: 10px;
}

.no-results {
  margin: 100px auto;
  font-size: 22pt;
  width: 500px;
}

.loading-indicator {
  margin: 100px auto;
  font-size: 22pt;
  width: 300px;
}

.pages span {
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
}

.pages span.active {
  background-color: #007bff;
  color: #fff;
}

.filters-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
  width: 200px;
  position: absolute;
  top: 80px;
  left: 10px;
  font-size: 16pt;
}
</style>


