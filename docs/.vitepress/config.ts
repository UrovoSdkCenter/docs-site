import { defineConfig } from 'vitepress'

/**
 * 侧边栏支持任意层级嵌套：
 * - 有 items：分组（可设 collapsed）
 * - 有 link：可点击页面
 */
const zhSidebar = [
  {
    text: '集成开发指南',
    items: [
      { text: '快速入门', link: '/guide/quick-start' },
      { text: '开发指南与基础', link: '/guide/basics' },
      { text: 'UrovoCustomer API', link: '/urovo-customer-api' },
      { text: '金融设备支付SDK', link: '/payment-sdk' },
      { text: 'AI人工智能SDK', link: '/ai-sdk' },
      { text: 'Urovo OpenAPI', link: '/openapi' },
      {
        text: '打印开发',
        collapsed: false,
        items: [
          {
            text: 'Urovo 内置打印机服务',
            collapsed: false,
            items: [
              { text: 'Urovo 打印服务介绍', link: '/printer/intro' },
              { text: 'SDK升级说明', link: '/printer/upgrade' },
              {
                text: 'SDK参考（新）',
                collapsed: false,
                items: [
                  { text: 'SDK概览', link: '/printer/sdk/overview' },
                  { text: 'SDK版本说明', link: '/printer/sdk/version' },
                  { text: '打印热敏小票接口', link: '/printer/sdk/thermal-receipt' },
                  { text: '打印标签小票接口', link: '/printer/sdk/label-receipt' },
                  { text: '打印文件接口', link: '/printer/sdk/print-file' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: '扫码开发',
        collapsed: true,
        items: [
          { text: '扫码概述', link: '/scanning/' },
          { text: '接入示例', link: '/scanning/sample' }
        ]
      },
      { text: '副屏开发', link: '/customer-display' },
      { text: '称重开发', link: '/electronic-scale' },
      { text: '读卡开发', link: '/card-reader' },
      { text: '钱箱开发', link: '/cash-drawer' },
      { text: '状态灯开发', link: '/status-light' },
      { text: '指纹开发', link: '/fingerprint' },
      { text: '安卓设备间通信连接开发', link: '/android-device-connection' },
      { text: '收款音箱开发', link: '/payment-sound-box' },
      { text: '电子价签开发', link: '/electronic-price-tag' },
      { text: '生物识别（指纹）开发指南', link: '/biometric-fingerprint' }
    ]
  }
]

const enSidebar = [
  {
    text: 'Integration Guide',
    items: [
      { text: 'Quick Start', link: '/en/guide/quick-start' },
      { text: 'Development Guide and Basics', link: '/en/guide/basics' },
      { text: 'UrovoCustomer API', link: '/en/urovo-customer-api' },
      { text: 'Payment SDK Development', link: '/en/payment-sdk' },
      { text: 'Artificial Intelligence(AI) SDK', link: '/en/ai-sdk' },
      { text: 'UROVO OpenAPI', link: '/en/openapi' },
      {
        text: 'Printer Development',
        collapsed: false,
        items: [
          {
            text: 'Urovo Built-in Printer Service',
            collapsed: false,
            items: [
              { text: 'Urovo Printer Service Introduction', link: '/en/printer/intro' },
              { text: 'SDK Upgrade Notes', link: '/en/printer/upgrade' },
              {
                text: 'SDK Reference (New)',
                collapsed: false,
                items: [
                  { text: 'SDK Overview', link: '/en/printer/sdk/overview' },
                  { text: 'SDK Version Notes', link: '/en/printer/sdk/version' },
                  { text: 'APIs for Thermal Receipts', link: '/en/printer/sdk/thermal-receipt' },
                  { text: 'APIs for Labels & Receipts', link: '/en/printer/sdk/label-receipt' },
                  { text: 'APIs for Printing Files', link: '/en/printer/sdk/print-file' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: 'Scanning Development',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/en/scanning/' },
          { text: 'Integration Sample', link: '/en/scanning/sample' }
        ]
      },
      { text: 'Customer Display Development', link: '/en/customer-display' },
      { text: 'Electronic Scale Development', link: '/en/electronic-scale' },
      { text: 'Card Reader Development', link: '/en/card-reader' },
      { text: 'Cash Drawer Development', link: '/en/cash-drawer' },
      { text: 'Status Light Development', link: '/en/status-light' },
      { text: 'Fingerprints Development', link: '/en/fingerprint' },
      { text: 'Android Device Connection Development', link: '/en/android-device-connection' },
      { text: 'Payment Sound Box Development', link: '/en/payment-sound-box' },
      { text: 'Electronic Price Tag Development', link: '/en/electronic-price-tag' },
      { text: 'Biometric (Fingerprint) Development Guide', link: '/en/biometric-fingerprint' }
    ]
  }
]

export default defineConfig({
  title: '集成开发指南',
  description: '产品 SDK 与开发文档',
  lastUpdated: true,
  cleanUrls: true,

  // GitHub Pages: https://urovosdkcenter.github.io/docs-site/
  base: '/docs-site/',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '文档',
      description: '集成开发指南',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '集成开发指南', link: '/guide/quick-start' },
          { text: '硬件产品', link: '/hardware/' },
          { text: '软件产品', link: '/software/' },
          { text: '手册&公告', link: '/handbooks/' }
        ],
        sidebar: zhSidebar,
        outline: { label: '本页目录', level: [2, 3] },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '更新时间' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色',
        darkModeSwitchTitle: '切换到深色',
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
          { text: 'Integration Guide', link: '/en/guide/quick-start' },
          { text: 'Hardware Products', link: '/en/hardware/' },
          { text: 'Software', link: '/en/software/' },
          { text: 'Handbooks & Bulletins', link: '/en/handbooks/' }
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light',
        darkModeSwitchTitle: 'Switch to dark',
        langMenuLabel: 'Change language'
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/UrovoSdkCenter/docs-site' }
    ],
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
