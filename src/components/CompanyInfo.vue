<template>
<div>
  <h3>Contacts we know atXX</h3>
  <h1>{{ company.name }}</h1>
  <div v-for="item of items" v-bind:key="item">
      <div class="header">{{ item.owner }} ({{item.contacts.length}})</div>
      <contact
        v-for="contact in item.contacts"
        v-bind:key="contact"
        :contact="contact"></contact>
  </div>
  </div>
</template>

<script>
import { ROOTURL } from '../globals'
import Contact from './Contact.vue'

export default {
  props: ['company'],
  components: { Contact },
  mounted () {
    this.fetchData()
  },
  watch: {
    company: function () {
      this.fetchData()
    }
  },
  data () {
    return {
      items: [
        { contacts: [], pos: '', owner: '' }
      ]
    }
  },

  methods: {
    fetchData () {
      this.loading = true
      const url = encodeURI(`${ROOTURL}company/${this.company.id}`)
      this.items = [{"owner":"Jesper Högström","contacts":[{"contact":"Sebastian Chung","pos":"Group Business Controller"}]}]

      // fetch(url, { 'no-cors': true })
      //   .then(response => response.json())
      //   .then(body => { this.items = body.data
      //   console.log(JSON.stringify(this.items)) })
      //   .then(() => { this.loading = false })
    }
  }
}
</script>

<style scoped>
.owner {
    border: 2px rgb(9, 41, 43);
}

.header {
  border: 2px outset rgb(215, 223, 233);
  background-color: rgb(168, 139, 43);
  text-align: left;
  padding: 5px;
  margin: 2px;
  font-size: 18px;

}

</style>
