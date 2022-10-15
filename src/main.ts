import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPencil,
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./assets/main.css";

/* add icons to the library */
library.add(faPencil, faTrashCan, faMagnifyingGlass);
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
