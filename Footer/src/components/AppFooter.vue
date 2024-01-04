<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  data() {
    return {
      title: 'Title'
    }
  }
})
</script>

<template>
  <div class="footer">
    <div class="grid m-0 p-0">
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-left pl-3">
          Version: 1.0.0.0 10/10/2023
        </span>
      </div>
      <div class="col-4 m-0 p-0"></div>
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-right pr-3"><a href="" class="footer-link">Support</a></span>
      </div>
    </div>
    <div class="grid m-0 p-0">
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-left pl-3">
          <a href="" class="footer-link">Governance</a> | <a href="" class="footer-link">SharePoint Training</a>
        </span>
      </div>
      <div class="col-4 m-0 p-0"></div>
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-right pr-3">888-888-8888 | <a href="" class="footer-link">Submit An Idea</a></span>
      </div>
    </div>
    <div class="grid m-0 p-0">
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-left pl-3">
          <a href="" class="footer-link">Terms of Use</a> | <a href="" class="footer-link">Accessibility</a> | <a href="" class="connect-footer-link">Lego Public Website</a>
        </span>
      </div>
      <div class="col-4 m-0 p-0"></div>
      <div class="col-4 m-0 p-0">
        <span class="footerDetails text-right pr-3"><a href="" class="footer-link">Feedback</a></span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
