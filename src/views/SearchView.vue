<template>
  <div class="home">
    <search></search>
  </div>
</template>

<script>
// @ is an alias to /src
import search from '../components/Search.vue'

export default {
  name: 'SearchView',
  components: {
    search
  }
}
</script>
