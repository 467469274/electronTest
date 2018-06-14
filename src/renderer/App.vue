<template>
  <div id="app">

  </div>
</template>

<script>
    const os = require("os");
    var pouchPath = (os.type()=='Windows_NT')?process.cwd():'/tmp';
    alert(pouchPath)
    var PouchDB = require('pouchdb-browser');
    var music = new PouchDB(pouchPath+'/muisc');
  export default {
    name: 'my-project',

      created(){
      }
  }
</script>

<style>
</style>
