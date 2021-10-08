<template>
<div>
  <h1>Search</h1>
  <button @click="fetchData()">Reload data</button>

  <div class="flex-container">
    <div class="flex-child magenta">
      <p>Filter company
      <input
          v-model="filterstr"
          placeholder="Enter filter" />
      </p>

      <div class="scrollable">
        <company
            v-for="company in companies"
            :item="company"
            :key="company.id"
            @selectedChanged="selectedChanged"></company>
      </div>
    </div>
    <div class="flex-child green scrollable">
        <company-info :company="selected"></company-info>
    </div>
  </div>
</div>
</template>

<script>
// import { ROOTURL } from '../globals'
import Company from './Company.vue'
import CompanyInfo from './CompanyInfo.vue'
// import { Auth, API } from 'aws-amplify'
import { API } from 'aws-amplify'

export default {
  components: { Company, CompanyInfo },

  mounted () {
    this.fetchData()
  },
  computed: {
    companies () {
      return this.items.filter(
        c => c.name.toLowerCase().includes(this.filterstr.toLowerCase()))
    }
  },
  data () {
    return {
      filterstr: '',
      selected: { id: '', name: '' },
      items: [
        { id: '', name: '' }
      ],
      jwt: ''
    }
  },
  methods: {
    setJwt(jwt) {
      this.jwt = jwt
    },
    async fetchData () {
      console.log('Reloading data')
      this.loading = true

      const apiName = 'api'
      const path = 'company'
      const myInit = {
        // headers: {
        //   Authorization: `Bearer ${(await Auth.currentSession())?.getAccessToken()?.getJwtToken()}`
        // }
      }
      // console.log('INIT', myInit.headers)
      // console.log('=============================')

      API
        .get(apiName, path, myInit)
        // .then(response => response.json())
        .then(body => { 
          this.items = body.data
          console.log(this.items) })
        .catch(error => console.log('ERROR', error))

      this.loading = false
    },
    selectedChanged (company) {
      this.selected = company
    }
  }
}
</script>

<style scoped>
.flex-container {
    display: flex;
    height: 80vh;
}

.flex-child {
    flex: 1;
    /* border: 2px solid yellow; */
}

.flex-child:first-child {
    margin-right: 20px;
}

.scrollable {
  /* height: 400px; */
  height: 90%;
  overflow-y: scroll;
  border: 3px;
}
</style>
