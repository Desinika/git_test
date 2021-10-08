<template>
  <div class="owner" @click="selectedChanged">
  {{ item.name }} ({{ item.cnt }})
  </div>
</template>

<script>
export default {
  props: ['item'],
  emits: ['selectedChanged'],
  methods: {
    selectedChanged () {
      this.$emit('selectedChanged', this.item)
    }
  }
}
</script>

<style scoped>

.owner {
  border: 5px outset rgb(124, 170, 223);
  background-color: lightblue;
  text-align: left;
  padding: 5px;
  margin: 2px;
}

</style>
