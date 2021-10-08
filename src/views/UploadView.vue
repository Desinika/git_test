<template>
<div>
  <h1>Internal contact owners</h1>
  <div class="flex-container">
    <div class="flex-child">
      <owner-list
        ref="ownerlist"
        @selectedChanged="selectedChanged">
      </owner-list>

      <new-owner @itemCreated="reloadData"></new-owner>
    </div>
    <div class="flex-child">
      <upload-control :owner="selected"></upload-control>
    </div>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import OwnerList from '../components/OwnerList.vue'
import UploadControl from '../components/UploadControl.vue'
import NewOwner from '../components/NewOwner.vue'

export default {
  name: 'UploadView',
  components: {
    OwnerList, UploadControl, NewOwner
  },
  data () {
    return {
      selected: { id: '', name: '' }
    }
  },
  methods: {
    selectedChanged (item) {
      this.selected = item
    },
    reloadData () {
      this.$refs.ownerlist.reload()
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
