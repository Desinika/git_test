<template>
<div
  class="mydiv"
  @click="companySelect"
  @mouseover="hover = true"
  @mouseleave="hover = false">
    {{ item.name }}
    <a :href="searchUrl" v-if="hover">
    <img width="14" height="14" src="../assets/icons8-search-48.png"/></a>
</div>
</template>

<script>
export default {
//   name: 'Company',
  props: ['item'],
  emits: ['selectedChanged'],
  data () {
    return {
      searchUrl: `http://www.google.com/search?q=${this.item.name.trim()}`,
      hover: false
    }
  },
  methods: {
    companySelect () {
      this.$emit('selectedChanged', this.item)
    }
  }
}

</script>

<style scoped>

.mydiv {
  border: 5px outset rgb(124, 170, 223);
  background-color: lightblue;
  text-align: left;
  padding: 5px;
  margin: 2px;

}

</style>
