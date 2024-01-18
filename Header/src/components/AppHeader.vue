<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'

let that: any

var slash = '/'
var tp1 = String(window.location.protocol)
var tp2 = String(window.location.host)

export default defineComponent({
  name: 'AppHeader',
  props: {
    WebTitle: String,
    WebUrl: String,
    SiteUrl: String
  },
  data() {
    return {
      timeout: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      that = this
    })
  },
  methods: {
    handleclick: function (e: any) {
      console.log('You clicked me ' + e.target.id)
      const elementid = e.target.id
      switch (elementid) {
        case 'button-info':
          that.InformationPanelVisible = true
          break
      }
    }
  }
})
</script>

<template>
  <div class="mainHeader" data-automationid="SiteHeader" data-layoutoption="2">
    <div class="logoCell">
      <a class="logoWrapper" :href="SiteUrl" aria-label="Lego Creations home" data-navigationcomponent="SiteHeader">
        <!-- <img class="logoImg" alt="" aria-hidden="true" src="https://mindpetal.sharepoint.com/SiteAssets/images/lego1.jpg"> -->
        <img class="logoImg" alt="" aria-hidden="true" src="https://legodan.sharepoint.com/sites/LegoCreations/SiteAssets/img/lego1.jpg">
      </a>
    </div>
    <div class="titleSubcell">
      <div class="ms-TooltipHost" role="none">
        <span data-automationid="SiteHeaderTitle" role="heading" aria-level="2" style="display: inline-block;">
          <div class="deferredLivePersonaCardRoot" tabindex="0" data-is-focusable="true">
            <span class="sitetitle" tabindex="0">{{ WebTitle }}</span>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
