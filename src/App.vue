<template>
  <div id="app">
    <Table />
  </div>
</template>

<script>
import Table from './components/Table.vue';

export default {
  name: 'App',
  components: {
    Table
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: white;
  color: #242424;
  font-family: "Comfortaa", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

#app {
  padding: 20px;
}
</style>





