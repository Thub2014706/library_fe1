import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import moment from 'moment';
// import VueMoment from 'vue-moment';

import router from "./router";


const app = createApp(App);

app.use(router);

app.use(ToastPlugin);
// app.use(VueMoment);
app.use(moment);

app.mount("#app");
