<template>
  <div id="app">

  </div>
</template>

<script>

    var PouchDB = require('pouchdb-browser');
    var music = new PouchDB('music');
  export default {
    name: 'my-project',

      created(){
      }
  }
</script>

<style>
</style>
