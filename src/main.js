import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./router/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'animate.css';
import registerComponent from "@/components/index.js";

// import tailwindcss from 'tailwindcss'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faCheck);

const app = createApp(App);
registerComponent(app);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
// app.use(tailwindcss);

app.use(Antd);
app.mount("#app");
