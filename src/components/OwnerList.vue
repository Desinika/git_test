<template>
<div>
  <p v-show="loading"> {{ dbstatus }} </p>
  <owner
    v-for="owner in owners"
    :key="owner"
    :item="owner"
    @selectedChanged="selectedChanged">
  </owner>
  <button @click="fetchData">Reload</button>
</div>
</template>

<script>
import { ROOTURL } from '../globals'
import Owner from './Owner.vue'

export default {
  components: { Owner },
  data () {
    return {
      loading: false,
      owners: { name: '' },
      dbstatus: ''
    }
  },
  mounted () {
    this.fetchData()
  },
  emits: ['selectedChanged'],
  methods: {
    fetchData () {
      this.loading = true
      const url = encodeURI(`${ROOTURL}owner`)
      this.dbstatus = 'Waiting for DB'
      console.log(url)

      fetch(url, { 'no-cors': true })
        .then(response => response.json())
        .then(body => { 
          this.owners = body.data 
          console.log(this.owners)
          })
        .then(() => { this.dbstatus = '' })
        .catch(() => { this.dbstatus = 'DB not ready. Try again' })
    },
    selectedChanged (item) {
      this.$emit('selectedChanged', item)
    },
    reload () {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.flex-container {
    display: flex;
}

.flex-child {
    flex: 1;
    /* border: 2px solid yellow; */
}

.flex-child:first-child {
    margin-right: 20px;
}
</style>
