import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import App from './App.vue'
import router from './router'

SuperTokens.init({
  appInfo: {
    appName: "recipiary",
    apiDomain: "http://localhost:8080",
    apiBasePath: "/auth",
  },
  recipeList: [
    Session.init(),
  ],
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
