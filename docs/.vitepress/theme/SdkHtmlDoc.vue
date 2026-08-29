<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useData } from 'vitepress'

const { site, page, lang } = useData()
const iframeRef = ref<HTMLIFrameElement | null>(null)

/** Follow VitePress locale; frontmatter can still override. */
const docLang = computed(() => {
  const fromFm = page.value.frontmatter.sdkHtmlLang as string | undefined
  if (fromFm) return fromFm
  return String(lang.value || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'
})

const src = computed(() => {
  const file =
    (page.value.frontmatter.sdkHtml as string) ||
    'urovocustomapi/urovo-custom-api-sdk-docs.html'
  let path = `${site.value.base}${file}`
  path += `${path.includes('?') ? '&' : '?'}lang=${encodeURIComponent(docLang.value)}`
  path += `&embed=1`
  return path
})

function syncIframeChrome() {
  const iframe = iframeRef.value
  if (!iframe) return
  try {
    const doc = iframe.contentDocument
    if (!doc) return
    // Hide in-doc language switcher; site locale controls language
    let style = doc.getElementById('vp-embed-hide-lang')
    if (!style) {
      style = doc.createElement('style')
      style.id = 'vp-embed-hide-lang'
      style.textContent = `
        .lang-switch,
        .lang-switch__btn,
        [class*="lang-switch"],
        button[data-lang],
        .docs-header__actions .lang-switch { display: none !important; }
      `
      doc.head?.appendChild(style)
    }
  } catch {
    // ignore cross-origin failures
  }
}

function onIframeLoad() {
  nextTick(syncIframeChrome)
}

watch(src, () => {
  nextTick(() => {
    // src change reloads iframe; load handler will sync
  })
})

onMounted(() => {
  nextTick(syncIframeChrome)
})
</script>

<template>
  <iframe
    ref="iframeRef"
    class="sdk-html-doc"
    :src="src"
    title="SDK API Documentation"
    loading="lazy"
    @load="onIframeLoad"
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
  vertical-align: top;
}
</style>
