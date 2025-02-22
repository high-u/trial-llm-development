# README

## 環境構築

- https://v5.daisyui.com/docs/install/vite/
- https://tailwindcss.com/docs/installation/using-vite
- https://ja.vite.dev/guide/

```bash
npm create vite@latest frontend -- --template vanilla
cd frontend
npm i alpinejs
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@beta
```

tailwind.config.js は不要っぽい？

```js:vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "src",
  base: "/",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
  plugins: [tailwindcss()],
});
```

```css:src/style.css
@import "tailwindcss";
@plugin "daisyui";
```

```src/index.html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
    </head>
    <body>
        <div id="app" x-data="app">
            <a href="https://vitejs.dev" target="_blank">
                <img :src="viteLogo" class="logo" alt="Vite logo" />
            </a>
            <h1>Hello Vite + Alpine!</h1>
            <div class="card">
                <button
                    id="counter"
                    type="button"
                    @click="count++"
                    x-text="`count is ${count}`"
                    class="btn"
                ></button>
            </div>
            <p class="read-the-docs">
                Click on the Vite and Alpine logos to learn more
            </p>
        </div>
        <script type="module" src="main.js"></script>
    </body>
</html>
```

```js:src/main.js
import viteLogo from "/vite.svg";
import Alpine from "alpinejs";
import "./style.css";

window.Alpine = Alpine;
Alpine.data("app", () => ({
  viteLogo,
  count: 0,
}));

Alpine.start();
```

```js:src/counter.js
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
```

```svg:src/javascript.svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#F7DF1E" d="M0 0h256v256H0V0Z"></path><path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"></path></svg>
```
