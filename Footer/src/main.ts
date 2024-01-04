import { createApp } from 'vue'
import PrimeVue from '../node_modules/primevue/config'

import FooterApp from './FooterApp.vue'
import './assets/main.scss'

const fapp = createApp(FooterApp)
/* fapp.use(PrimeVue, { unstyled: true }) */
fapp.use(PrimeVue)

fapp.mount('#VueFooter')
