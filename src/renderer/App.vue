<template>
  <div id="app">

  </div>
</template>

<script>

    var PouchDB = require('pouchdb-browser');
    var music = new PouchDB('music');
    var insertionDB = new PouchDB('inser');
  export default {
    name: 'my-project',

      created(){
      }
  }
</script>

<style>
</style>
