<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, page } = useData()

const src = computed(() => {
  const file =
    (page.value.frontmatter.sdkHtml as string) ||
    'urovocustomapi/urovo-custom-api-sdk-docs.html'
  // 中文站默认 zh；英文站页面会显式传 en
  const lang =
    (page.value.frontmatter.sdkHtmlLang as string | undefined) || 'zh'
  let path = `${site.value.base}${file}`
  path += `${path.includes('?') ? '&' : '?'}lang=${encodeURIComponent(lang)}`
  return path
})
</script>

<template>
  <iframe
    class="sdk-html-doc"
    :src="src"
    title="SDK API Documentation"
    loading="lazy"
  />
</template>

<style scoped>
.sdk-html-doc {
  display: block;
  width: 100%;
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  height: calc(100vh - var(--vp-nav-height, 64px));
  border: 0;
  background: #eef1f4;
}
</style>
