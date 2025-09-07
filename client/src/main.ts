import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Modal from './components/ui/Modal.vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'
import {router} from './router.ts'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('Modal', Modal);
app.use(Vue3Toastify,{
  autoClose:2000,
  pauseOnHover: true,
  closeButton:true,
  position:'bottom-right',
  style: {
    opacity:'1',
    userSelect: 'initial'
  } as ToastContainerOptions
})
app.mount('#app')
