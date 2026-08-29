import { onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import SdkHtmlDoc from './SdkHtmlDoc.vue'
import './accordion.css'
import './custom.css'

let ignoreClick = false

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

    // Wait until VitePress finishes toggling this group
    requestAnimationFrame(() => {
      // Only enforce accordion when this group is now expanded
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
      // Release on next frame
      requestAnimationFrame(() => {
        ignoreClick = false
      })
    })
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SdkHtmlDoc', SdkHtmlDoc)
  },
  setup() {
    const route = useRoute()

    const bind = () => {
      nextTick(() => {
        const sidebar = document.querySelector('.VPSidebar') as HTMLElement | null
        if (sidebar) delete sidebar.dataset.accordionBound
        setupSidebarAccordion()
      })
    }

    onMounted(bind)
    watch(() => route.path, bind)
  }
}
