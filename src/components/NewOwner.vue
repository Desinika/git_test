<template>
  <div class="uploadframe">
    <p>Add new internal contact owner</p>
    <p>Name:<input v-model="name" placeholder="firstname lastname"/></p>
    <button @click="createOwner" :disabled="!name">Add new</button>
  </div>
</template>

<script>
import { ROOTURL } from '../globals'

export default {
  data () {
    return {
      name: ''
    }
  },
  emits: ['itemCreated'],
  methods: {
    createOwner () {
      const url = `${ROOTURL}/owner`
      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.name }) // body data type must match "Content-Type" header
      })
        .then(() => this.$emit('itemCreated'))
        .then(() => { this.name = '' })
    }
  }

}
</script>

<style>
.uploadframe {
  border: 2px grey inset;
  margin-top: 20px;
}
</style>
