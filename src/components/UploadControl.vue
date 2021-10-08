<template>

  <div v-if="owner.name != ''">
    <div class="header">
      {{ owner.name }}<br>
      <div class="contacts">
        Contacts: {{ owner.cnt }}
      </div>
    </div>
    <div class="uploadarea">
      <input ref="upload" type="file"/>
      <p></p>
      <button id="uploadContacts" @click="uploadContacts()">Upload</button>
    </div>
    <p v-show="showlog">File uploaded</p>
  </div>

</template>

<script>
import { ROOTURL } from '../globals'

export default {
  props: ['owner'],
  data () {
    return {
      showlog: false
    }
  },
  methods: {
    uploadContacts () {
      var files = this.$refs.upload.files
      if (!files.length) {
        return alert('Please choose a file to upload first.')
      }
      var file = files[0]

      const url = `${ROOTURL}owner/uploadurl/${this.owner.name}/${file.name}`
      fetch(url)
        .then(response => response.json())
        .then(body => this.uploadFile(body.url, file))
    },
    uploadFile (s3fields, file) {
      const formData = new FormData()
      Object.keys(s3fields.fields).forEach(key => {
        formData.append(key, s3fields.fields[key])
      })
      formData.append('file', file)
      formData.append('Content-Type', 'application/zip')
      fetch(s3fields.url, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          this.showlog = true
          this.$refs.upload.value = ''
          setTimeout(this.hidelog, 3000)
        })
    },
    hidelog () {
      this.showlog = false
    }
  }
}

</script>

<style scoped>
.header {
  border: 5px outset rgb(124, 170, 223);
  background-color: lightblue;
  text-align: left;
  padding: 5px;
  margin: 2px;
  font-size: 24px;
}

.contacts {
  padding-left: 10px;
  font-size: 12px;
}

.uploadarea {
  border: 2px outset rgb(223, 229, 236);
  text-align: left;
  padding: 5px;
  margin: 2px;

}
</style>>
