// Core Vue JS
import Vue from "vue";
import router from "./router";
import store from "./store";
import {sync} from "vuex-router-sync";
import vSelect from "vue-select";
// Import AXIOS For http If need to make API Calls to Backend or 3rd Party
import Axios from "axios";
// Vue Form Library for Custom Validations and Slot based messages.
import VueForm from "vue-form";
// Toastr for Pop Up Notifications
import Toastr from "vue-toastr";
import {TOASTR_CONFIG} from "./config/toastr.config";
// ES6 Promise for IE Support
import "es6-promise/auto";
// Progress for API Calls
import {loadProgressBar} from "axios-progress-bar";
import {LOADER_CONFIG} from "./config/loader.config";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

sync(store, router);

Vue.prototype.$http = Axios;
Vue.use(VueForm);

Vue.use(Toastr, TOASTR_CONFIG);

loadProgressBar(LOADER_CONFIG);

Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

import App from "./views/app";

// Mount Vue JS APP into #app <div>

new Vue({
    el: "#app",
    router,
    store,
    created: function () {
        window.Vue = this;
    },
    template: "<App/>",
    components: {App}
});
