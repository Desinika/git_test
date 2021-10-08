<template>
  <div class="contact">
  {{ contactName }}
  </div>
</template>

<script>
export default {
  props: ['contact'],
  computed: {
    contactName () {
      let res = this.contact.contact
      if (this.contact.pos) {
        res += ` (${this.contact.pos})`
      }
      if (!this.contact.contact) {
        res = 'n/a'
      }
      return res
    }
  }
}
</script>

<style>
.contact {
  background-color: rgb(239, 243, 245);
  text-align: left;
  padding: 5px;
  padding-left: 15px;
  margin: 2px;
}
</style>
