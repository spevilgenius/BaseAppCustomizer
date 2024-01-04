<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from 'vue'
import * as ExtensionProperties from './lib/ExtensionProperties'
import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  name: 'HeaderApp',
  components: { AppHeader },
  data() {
    return {
      WebTitle: '',
      WebUrl: '',
      SiteUrl: '',
      Instance: ''
    }
  },
  mounted() {
    this.setPropertiesFromExtension()
  },
  methods: {
    setPropertiesFromExtension() {
      this.Instance = ExtensionProperties.getInstanceId(this.$root as ComponentPublicInstance)
      this.WebTitle = ExtensionProperties.getPropertyString(this.$root as ComponentPublicInstance, 'webtitle')
      this.WebUrl = ExtensionProperties.getPropertyString(this.$root as ComponentPublicInstance, 'weburl')
      this.SiteUrl = ExtensionProperties.getPropertyString(this.$root as ComponentPublicInstance, 'siteurl')
    }
  }
})
</script>

<template>
  <AppHeader :WebTitle="WebTitle" :WebUrl="WebUrl" :SiteUrl="SiteUrl" />
</template>

<style scoped></style>
