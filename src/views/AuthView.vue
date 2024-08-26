<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const loadScript = (src: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.id = 'supertokens-script';
  script.onload = () => {
    (window as any).supertokensUIInit("supertokensui", {
      appInfo: {
        appName: "recipiary",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
      },
      recipeList: [
        (window as any).supertokensUIThirdParty.init({
          signInAndUpFeature: {
            providers: [
              (window as any).supertokensUIThirdParty.Github.init(),
              (window as any).supertokensUIThirdParty.Google.init(),
              (window as any).supertokensUIThirdParty.Facebook.init(),
              (window as any).supertokensUIThirdParty.Apple.init(),
            ]
          },
        }),
        (window as any).supertokensUISession.init(),
      ],
    });
  };
  document.body.appendChild(script);
};

onMounted(() => {
  loadScript('https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.45.1/build/static/js/main.0a6e3c10.js');
});

onUnmounted(() => {
  const script = document.getElementById('supertokens-script');
  if (script) {
    script.remove();
  }
});
</script>

<template>
  <div id="supertokensui" />
</template>
