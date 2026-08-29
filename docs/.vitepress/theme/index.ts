import { onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData, withBase } from 'vitepress'
import SdkHtmlDoc from './SdkHtmlDoc.vue'
import './accordion.css'
import './custom.css'

let ignoreClick = false

/** API index path → download page path (no site base). */
const API_TO_DOWNLOAD: Array<{ test: RegExp; download: string }> = [
  { test: /^\/zh\/urovo-customer-api\/?$/, download: '/zh/urovo-customer-api/download' },
  { test: /^\/urovo-customer-api\/?$/, download: '/urovo-customer-api/download' },
  { test: /^\/zh\/printer\/pos\/?$/, download: '/zh/printer/pos/download' },
  { test: /^\/printer\/pos\/?$/, download: '/printer/pos/download' },
  { test: /^\/zh\/cradle\/?$/, download: '/zh/cradle/download' },
  { test: /^\/cradle\/?$/, download: '/cradle/download' },
  { test: /^\/zh\/scanning\/?$/, download: '/zh/scanning/download' },
  { test: /^\/scanning\/?$/, download: '/scanning/download' },
  { test: /^\/zh\/rfid\/?$/, download: '/zh/rfid/download' },
  { test: /^\/rfid\/?$/, download: '/rfid/download' },
  {
    test: /^\/zh\/label-printer\/k388pro\/?$/,
    download: '/zh/label-printer/k388pro/download'
  },
  {
    test: /^\/label-printer\/k388pro\/?$/,
    download: '/label-printer/k388pro/download'
  },
  {
    test: /^\/zh\/label-printer\/k388pro-ble\/?$/,
    download: '/zh/label-printer/k388pro-ble/download'
  },
  {
    test: /^\/label-printer\/k388pro-ble\/?$/,
    download: '/label-printer/k388pro-ble/download'
  }
]

const GUIDE_TEXTS = new Set([
  'Integration Guide',
  '集成开发指南',
  'Download & Demo',
  '下载和 Demo'
])

function stripBase(path: string) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  // Relative base "./" used for offline builds — skip stripping
  if (!base || base === '.' || base === '') return path
  if (path.startsWith(base + '/')) return path.slice(base.length) || '/'
  if (path === base) return '/'
  return path
}

function normalizePath(path: string) {
  let p = stripBase(path.split('?')[0].split('#')[0])
  if (p.endsWith('/index.html')) p = p.slice(0, -11)
  else if (p.endsWith('/index')) p = p.slice(0, -6) || '/'
  else if (p.endsWith('.html')) p = p.slice(0, -5)
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p === '' ? '/' : p
}

function resolveDownloadPath(path: string): string | null {
  const raw = normalizePath(path)
  const candidates = [raw, raw + '/']
  for (const c of candidates) {
    for (const rule of API_TO_DOWNLOAD) {
      if (rule.test.test(c)) return rule.download
    }
  }
  return null
}

function setupSidebarAccordion() {
  const sidebar = document.querySelector('.VPSidebar') as HTMLElement | null
  if (!sidebar || sidebar.dataset.accordionBound === '1') return
  sidebar.dataset.accordionBound = '1'

  sidebar.addEventListener('click', (ev) => {
    if (ignoreClick) return
    const target = ev.target as HTMLElement | null
    if (!target) return

    const caret = target.closest('.VPSidebarItem.collapsible .caret')
    if (!caret) return

    const item = caret.closest('.VPSidebarItem.collapsible') as HTMLElement | null
    if (!item) return

    requestAnimationFrame(() => {
      if (item.classList.contains('collapsed')) return

      const parent = item.parentElement
      if (!parent) return

      const siblings = Array.from(
        parent.querySelectorAll(':scope > .VPSidebarItem.collapsible')
      ) as HTMLElement[]

      ignoreClick = true
      siblings.forEach((sib) => {
        if (sib === item) return
        if (!sib.classList.contains('collapsed')) {
          const otherCaret = sib.querySelector('.caret') as HTMLElement | null
          otherCaret?.click()
        }
      })
      requestAnimationFrame(() => {
        ignoreClick = false
      })
    })
  })
}

function syncSdkHtmlMode(frontmatter: Record<string, unknown>) {
  const isSdkHtml =
    frontmatter.sdkHtml != null || frontmatter.sdkHtmlLang != null
  document.documentElement.classList.toggle('sdk-html-mode', Boolean(isSdkHtml))
  return Boolean(isSdkHtml)
}

/**
 * On API HTML pages, swap top-nav "Integration Guide" into
 * "Download & Demo" pointing at that product's download page.
 */
function syncNavDownloadLink(path: string, isSdkHtml: boolean, isZh: boolean) {
  const downloadPath = isSdkHtml ? resolveDownloadPath(path) : null
  const links = document.querySelectorAll<HTMLAnchorElement>(
    '.VPNavBarMenu .VPNavBarMenuLink, .VPNavScreenMenuLink'
  )

  links.forEach((link) => {
    const text = (link.textContent || '').trim()
    if (!GUIDE_TEXTS.has(text) && !link.dataset.vpGuideSlot) return

    // Mark so we can restore even after text changes
    link.dataset.vpGuideSlot = '1'

    if (downloadPath) {
      if (!link.dataset.vpGuideHref) {
        link.dataset.vpGuideHref = link.getAttribute('href') || ''
        link.dataset.vpGuideText = text.startsWith('Download') || text.startsWith('下载')
          ? isZh
            ? '集成开发指南'
            : 'Integration Guide'
          : text
      }
      link.textContent = isZh ? '下载和 Demo' : 'Download & Demo'
      link.setAttribute('href', withBase(downloadPath))
      link.classList.add('is-download-shortcut')
    } else if (link.dataset.vpGuideSlot === '1') {
      const restoreText =
        link.dataset.vpGuideText || (isZh ? '集成开发指南' : 'Integration Guide')
      const restoreHref =
        link.dataset.vpGuideHref ||
        withBase(isZh ? '/zh/guide/quick-start' : '/guide/quick-start')
      link.textContent = restoreText
      link.setAttribute('href', restoreHref)
      link.classList.remove('is-download-shortcut')
    }
  })
}

/** Expand collapsed sidebar ancestors of the active download link. */
function expandActiveSidebarTrail() {
  const active = document.querySelector(
    '.VPSidebar .VPSidebarItem.is-active > .item .link, .VPSidebar a.is-active'
  ) as HTMLElement | null
  if (!active) return

  let node: HTMLElement | null = active.closest('.VPSidebarItem')
  while (node) {
    if (node.classList.contains('collapsible') && node.classList.contains('collapsed')) {
      const caret = node.querySelector('.caret') as HTMLElement | null
      caret?.click()
    }
    const parentItem = node.parentElement?.closest(
      '.VPSidebarItem.collapsible'
    ) as HTMLElement | null
    node = parentItem
  }

  active.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SdkHtmlDoc', SdkHtmlDoc)
  },
  setup() {
    const route = useRoute()
    const { page, frontmatter, lang } = useData()

    const bind = () => {
      nextTick(() => {
        const fm = frontmatter.value as Record<string, unknown>
        const isSdkHtml = syncSdkHtmlMode(fm)
        const isZh = String(lang.value || '').toLowerCase().startsWith('zh')
        syncNavDownloadLink(route.path, isSdkHtml, isZh)

        const sidebar = document.querySelector('.VPSidebar') as HTMLElement | null
        if (sidebar) delete sidebar.dataset.accordionBound
        setupSidebarAccordion()

        // After leaving API page to Download & Demo, open the active sidebar branch
        if (!isSdkHtml) {
          requestAnimationFrame(() => {
            expandActiveSidebarTrail()
            // Accordion / layout may settle a frame later
            setTimeout(expandActiveSidebarTrail, 80)
          })
        }
      })
    }

    onMounted(bind)
    watch(() => route.path, bind)
    watch(
      () => [
        page.value.relativePath,
        frontmatter.value.sdkHtml,
        frontmatter.value.sdkHtmlLang
      ],
      bind
    )
  }
}
