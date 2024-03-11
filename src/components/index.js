import { widthInstall } from "./with-install.js";
import DownToTopTip from "./downToTopTip.vue";
DownToTopTip.name = "DownToTopTip";
const plugins = [DownToTopTip];

function registerComponent(app) {
  plugins.forEach((plugin) => {
    app.use(widthInstall(plugin));
  });
}
export default registerComponent;
