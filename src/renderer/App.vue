<template>
  <div id="app">

  </div>
</template>

<script>
    const os = require("os");
    var pouchPath = (os.type()=='Windows_NT')?process.cwd():'/tmp';
    alert(pouchPath)
    var PouchDB = require('pouchdb-browser');
    var music = new PouchDB(pouchPath+'/data/');
  export default {
    name: 'my-project',
      created(){
          music.destroy().then(function (response) {
              console.log(music)
              console.log('成功清除全部缓存')
          }).catch(function (err) {
              console.log(err)
          });
      }
  }
</script>

<style>
</style>
