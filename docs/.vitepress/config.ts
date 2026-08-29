import { defineConfig } from 'vitepress'

/**
 * 侧边栏支持任意层级嵌套：
 * - 有 items：分组（可设 collapsed）
 * - 有 link：可点击页面
 * collapsed: true = 默认收起，点击再展开；主题脚本保证同级只展开一个
 */
const zhSidebar = [
  {
    text: '集成开发指南',
    items: [
      { text: '快速入门', link: '/guide/quick-start' },
      { text: '开发指南与基础', link: '/guide/basics' },
      {
        text: 'Urovo 设备 API',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/urovo-customer-api/' },
          { text: '下载和 Demo', link: '/urovo-customer-api/download' }
        ]
      },
      {
        text: 'Print 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/printer/pos/' },
          { text: '下载和 Demo', link: '/printer/pos/download' }
        ]
      },
      {
        text: 'Cradle 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/cradle/' },
          { text: '下载和 Demo', link: '/cradle/download' }
        ]
      },
      {
        text: '扫码开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/scanning/' },
          { text: '下载和 Demo', link: '/scanning/download' }
        ]
      },
      {
        text: 'RFID 开发',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/rfid/' },
          { text: '下载和 Demo', link: '/rfid/download' }
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
              { text: 'API 参考', link: '/label-printer/k388pro/' },
              { text: '下载和 Demo', link: '/label-printer/k388pro/download' }
            ]
          },
          {
            text: 'K388Pro 蓝牙版本',
            collapsed: true,
            items: [
              { text: 'API 参考', link: '/label-printer/k388pro-ble/' },
              { text: '下载和 Demo', link: '/label-printer/k388pro-ble/download' }
            ]
          }
        ]
      }
    ]
  }
]

const enSidebar = [
  {
    text: 'Integration Guide',
    items: [
      { text: 'Quick Start', link: '/en/guide/quick-start' },
      { text: 'Development Guide and Basics', link: '/en/guide/basics' },
      {
        text: 'Urovo Device API',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/en/urovo-customer-api/' },
          { text: 'Download & Demo', link: '/en/urovo-customer-api/download' }
        ]
      },
      {
        text: 'Print Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/en/printer/pos/' },
          { text: 'Download & Demo', link: '/en/printer/pos/download' }
        ]
      },
      {
        text: 'Cradle Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/en/cradle/' },
          { text: 'Download & Demo', link: '/en/cradle/download' }
        ]
      },
      {
        text: 'Scanning Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/en/scanning/' },
          { text: 'Download & Demo', link: '/en/scanning/download' }
        ]
      },
      {
        text: 'RFID Development',
        collapsed: true,
        items: [
          { text: 'API Reference', link: '/en/rfid/' },
          { text: 'Download & Demo', link: '/en/rfid/download' }
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
              { text: 'API Reference', link: '/en/label-printer/k388pro/' },
              { text: 'Download & Demo', link: '/en/label-printer/k388pro/download' }
            ]
          },
          {
            text: 'K388Pro BLE',
            collapsed: true,
            items: [
              { text: 'API Reference', link: '/en/label-printer/k388pro-ble/' },
              { text: 'Download & Demo', link: '/en/label-printer/k388pro-ble/download' }
            ]
          }
        ]
      }
    ]
  }
]

export default defineConfig({
  title: '集成开发指南',
  description: '产品 SDK 与开发文档',
  // 站点默认语言为中文（root locale）
  lang: 'zh-CN',
  lastUpdated: true,
  // 关闭暗色模式切换，固定浅色
  appearance: false,
  // 离线包需带 .html 后缀，否则解压后无法跳转
  cleanUrls: process.env.OFFLINE !== '1',

  // GitHub Pages 用 /docs-site/；离线包用相对路径 ./
  base: process.env.OFFLINE === '1' ? './' : '/docs-site/',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '文档',
      description: '集成开发指南',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '集成开发指南', link: '/guide/quick-start' }
        ],
        sidebar: zhSidebar,
        outline: { label: '本页目录', level: [2, 3] },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '更新时间' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        langMenuLabel: '切换语言'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Documentation',
      description: 'Integration Guide',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Docs Home', link: '/en/' },
          { text: 'Integration Guide', link: '/en/guide/quick-start' }
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language'
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
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search docs' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    }
  }
})
