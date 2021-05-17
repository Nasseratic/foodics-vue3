import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import VueFinalModal from "vue-final-modal";
import Toaster from "@meforma/vue-toaster";
import { createDynamicForms } from "@asigloo/vue-dynamic-forms";
import "./index.css";

const VueDynamicForms = createDynamicForms();

export const app = createApp(App);

app.use(router);

app.use(VueFinalModal());

app.use(VueDynamicForms);

app.use(Toaster);

app.mount("#app");
