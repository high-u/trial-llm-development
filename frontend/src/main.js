import viteLogo from "/vite.svg";
import Alpine from "alpinejs";
import "./style.css";

window.Alpine = Alpine;
Alpine.data("app", () => ({
  viteLogo,
  count: 0,
}));

Alpine.start();
