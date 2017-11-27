<template>
  <div id='app'>
    <h1>Anti Tiếq Việt</h1>
    <textarea
      v-model='message'
      placeholder='Gõ tiếq Việt vào dây nào kák bạn'
      @input='convert'></textarea>
    <pre class='result'>{{ convertedMessage }}</pre>
    <button @click='copy'>Copy</button>
     <textarea class='target' ref='copyArea' v-model='convertedMessage'></textarea>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { revert } from './revert'

export default {
  name: 'app',
  data () {
    return {
      message: `Căm năm coq kõi qười ta
Cữ tài cữ mện' xéo là gét n'au
Cải kua một kuộk bể zâu
N'ữq diều côq wấy mà dau zạ zày
Ta di cên cái dất này
Bốn fươq vô sản zạ zày dều dau
Lớp ca cướk, lớp kon sau
Dã wàn' dồq cí, kùq dau zạ zày`,
      convertedMessage: ''
    }
  },

  mounted () {
    this.convert()
  },

  methods: {
    convert: debounce(function () {
      this.convertedMessage = revert(this.message)
    }, 200),

    copy () {
      this.$refs.copyArea.select()
      document.execCommand('copy')
      this.$refs.copyArea.blur()
    }
  }
}
</script>

<style>
#app {
   width: 500px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body,
html {
  font-size: 14px;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 15px;
  line-height: 1.6;
}

a {
  color: #b74444;
  text-decoration: none;
}

textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  padding: 8px;
}

.result {
  width: 100%;
  margin: 0 auto;
  margin-top: 18px;
  background: #f1f1f1;
  border-radius: 5px;
  padding: 8px;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  white-space: pre-wrap;
}

.copyright {
  font-size: 0.9rem;
  margin-top: 50px;
  color: #666;
}

.target {
  width: 1px;
  height: 1px;
  position: fixed;
  bottom: 0;
  opacity: 0;
}
</style>
