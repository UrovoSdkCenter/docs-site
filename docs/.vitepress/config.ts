import { defineConfig } from 'vitepress'

/**
 * Sidebar: items can nest; collapsed groups expand on click.
 * Theme accordion keeps only one sibling group open.
 */
const enSidebar = [
  {
    text: 'Integration Guide',
    items: [
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Development Guide and Basics', link: '/guide/basics' },
      {
        text: 'Urovo Device API',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/urovo-customer-api/' },
          { text: 'Download & Demo', link: '/urovo-customer-api/download' }
        ]
      },
      {
        text: 'Print Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/printer/pos/' },
          { text: 'Download & Demo', link: '/printer/pos/download' }
        ]
      },
      {
        text: 'Cradle Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/cradle/' },
          { text: 'Download & Demo', link: '/cradle/download' }
        ]
      },
      {
        text: 'Scanning Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/scanning/' },
          { text: 'Download & Demo', link: '/scanning/download' }
        ]
      },
      {
        text: 'RFID Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/rfid/' },
          { text: 'Download & Demo', link: '/rfid/download' }
        ]
      },
      {
        text: 'Label Printer Development',
        collapsed: true,
        items: [
          {
            text: 'K388Pro',
            collapsed: true,
            items: [
              { text: 'API Reference', link: '/label-printer/k388pro/' },
              { text: 'Download & Demo', link: '/label-printer/k388pro/download' }
            ]
          },
          {
            text: 'K388Pro BLE',
            collapsed: true,
            items: [
              { text: 'API Reference', link: '/label-printer/k388pro-ble/' },
              { text: 'Download & Demo', link: '/label-printer/k388pro-ble/download' }
            ]
          }
        ]
      }
    ]
  }
]

const zhSidebar = [
  {
    text: '集成开发指南',
    items: [
      { text: '快速入门', link: '/zh/guide/quick-start' },
      { text: '开发指南与基础', link: '/zh/guide/basics' },
      {
        text: 'Urovo 设备 API',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/zh/urovo-customer-api/' },
          { text: '下载和 Demo', link: '/zh/urovo-customer-api/download' }
        ]
      },
      {
        text: 'Print 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/zh/printer/pos/' },
          { text: '下载和 Demo', link: '/zh/printer/pos/download' }
        ]
      },
      {
        text: 'Cradle 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/zh/cradle/' },
          { text: '下载和 Demo', link: '/zh/cradle/download' }
        ]
      },
      {
        text: '扫码开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/zh/scanning/' },
          { text: '下载和 Demo', link: '/zh/scanning/download' }
        ]
      },
      {
        text: 'RFID 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/zh/rfid/' },
          { text: '下载和 Demo', link: '/zh/rfid/download' }
        ]
      },
      {
        text: '贴标机开发',
        collapsed: true,
        items: [
          {
            text: 'K388Pro',
            collapsed: true,
            items: [
              { text: 'API 参考', link: '/zh/label-printer/k388pro/' },
              { text: '下载和 Demo', link: '/zh/label-printer/k388pro/download' }
            ]
          },
          {
            text: 'K388Pro 蓝牙版本',
            collapsed: true,
            items: [
              { text: 'API 参考', link: '/zh/label-printer/k388pro-ble/' },
              { text: '下载和 Demo', link: '/zh/label-printer/k388pro-ble/download' }
            ]
          }
        ]
      }
    ]
  }
]

export default defineConfig({
  title: 'Integration Guide',
  description: 'Product SDKs and developer documentation',
  // Default site language is English (root locale)
  lang: 'en-US',
  lastUpdated: true,
  appearance: false,
  cleanUrls: process.env.OFFLINE !== '1',
  base: process.env.OFFLINE === '1' ? './' : '/docs-site/',

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Documentation',
      description: 'Integration Guide',
      themeConfig: {
        nav: [
          { text: 'Docs Home', link: '/' },
          { text: 'Integration Guide', link: '/guide/quick-start' }
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language'
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '文档',
      description: '集成开发指南',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '集成开发指南', link: '/zh/guide/quick-start' }
        ],
        sidebar: zhSidebar,
        outline: { label: '本页目录', level: [2, 3] },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '更新时间' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        langMenuLabel: '切换语言'
      }
    }
  },

  themeConfig: {
    socialLinks: [],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search docs' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          },
          zh: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    }
  }
})
