import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './assets/css/style.css'
import './assets/js/easing.js'
import './assets/js/anime.min.js'
import './assets/js/fontawesome.js'
import './assets/js/vegas.js'
import './assets/js/fittext.js'
import './assets/js/lettering.js'
import './assets/js/textillate.js'
import './assets/js/common.js'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(router)
app.mixin(mixins)
app.use(store)
app.use(VueSweetalert2)
//app.use(vagas);
app.use(CKEditor).mount(/* DOM element */)
app.mount('#app')
