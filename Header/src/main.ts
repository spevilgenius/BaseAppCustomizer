import { createApp } from 'vue'
// import PrimeVue from '../node_modules/primevue/config'

import HeaderApp from './HeaderApp.vue'
import './assets/main.scss'

const happ = createApp(HeaderApp)
/* happ.use(PrimeVue, { unstyled: true }) */
// happ.use(PrimeVue)

happ.mount('#VueHeader')
