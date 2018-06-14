<template>
  <div id="app">

  </div>
</template>

<script>

    var PouchDB = require('pouchdb-browser');
    var music = new PouchDB('music');
    var insertionDB = new PouchDB('inser');
    import {machineIdSync} from 'node-machine-id';
  export default {
    name: 'my-project',

      created(){
          alert(1)
          music.destroy().then(function (response) {
              console.log(music)
              console.log('成功清除全部缓存')
          }).catch(function (err) {
              console.log(err)
          });
          insertionDB.destroy().then(function (response) {
              console.log('成功清除全部缓存')
          }).catch(function (err) {
              console.log(err)

          });
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
          console.log(machineIdSync({original: true}))
      }
  }
</script>

<style>
</style>
