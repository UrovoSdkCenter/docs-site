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
      {
        text: 'RFID 开发',
        collapsed: false,
        items: [
          { text: 'RFID 概述', link: '/rfid/' },
          { text: '下载与 Demo', link: '/rfid/download' },
          { text: '快速接入', link: '/rfid/quick-start' }
        ]
      },
      {
        text: '贴标机开发',
        collapsed: false,
        items: [
          { text: 'K388Pro', link: '/label-printer/k388pro' },
          {
            text: 'K388Pro 蓝牙版本',
            collapsed: false,
            items: [
              { text: '概述', link: '/label-printer/k388pro-ble/' },
              { text: '接入', link: '/label-printer/k388pro-ble/integration' },
              { text: '快速开始', link: '/label-printer/k388pro-ble/quick-start' },
              {
                text: 'API 参考',
                collapsed: false,
                items: [
                  { text: '接口总览', link: '/label-printer/k388pro-ble/api/' },
                  { text: '初始化', link: '/label-printer/k388pro-ble/api/init' },
                  { text: '连接', link: '/label-printer/k388pro-ble/api/connection' },
                  { text: '发送打印数据', link: '/label-printer/k388pro-ble/api/print' },
                  { text: '状态与固件', link: '/label-printer/k388pro-ble/api/status' },
                  { text: '页面设置', link: '/label-printer/k388pro-ble/api/page' },
                  { text: '绘制', link: '/label-printer/k388pro-ble/api/drawing' },
                  { text: '打印设置', link: '/label-printer/k388pro-ble/api/settings' }
                ]
              },
              { text: '示例', link: '/label-printer/k388pro-ble/samples' },
              { text: '注意事项与 FAQ', link: '/label-printer/k388pro-ble/faq' }
            ]
          },
          { text: '下载 SDK / Demo', link: '/label-printer/download' }
        ]
      },
      { text: '副屏开发', link: '/customer-display' },
      { text: '称重开发', link: '/electronic-scale' }
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
      {
        text: 'RFID Development',
        collapsed: false,
        items: [
          { text: 'RFID Overview', link: '/en/rfid/' },
          { text: 'Download & Demo', link: '/en/rfid/download' },
          { text: 'Quick Start', link: '/en/rfid/quick-start' }
        ]
      },
      {
        text: 'Label Printer Development',
        collapsed: false,
        items: [
          { text: 'K388Pro', link: '/en/label-printer/k388pro' },
          {
            text: 'K388Pro BLE',
            collapsed: false,
            items: [
              { text: 'Overview', link: '/en/label-printer/k388pro-ble/' },
              { text: 'Integration', link: '/en/label-printer/k388pro-ble/integration' },
              { text: 'Quick Start', link: '/en/label-printer/k388pro-ble/quick-start' },
              {
                text: 'API Reference',
                collapsed: false,
                items: [
                  { text: 'Overview', link: '/en/label-printer/k388pro-ble/api/' },
                  { text: 'Initialization', link: '/en/label-printer/k388pro-ble/api/init' },
                  { text: 'Connection', link: '/en/label-printer/k388pro-ble/api/connection' },
                  { text: 'Send print data', link: '/en/label-printer/k388pro-ble/api/print' },
                  { text: 'Status and firmware', link: '/en/label-printer/k388pro-ble/api/status' },
                  { text: 'Page setup', link: '/en/label-printer/k388pro-ble/api/page' },
                  { text: 'Drawing', link: '/en/label-printer/k388pro-ble/api/drawing' },
                  { text: 'Print settings', link: '/en/label-printer/k388pro-ble/api/settings' }
                ]
              },
              { text: 'Samples', link: '/en/label-printer/k388pro-ble/samples' },
              { text: 'Notes & FAQ', link: '/en/label-printer/k388pro-ble/faq' }
            ]
          },
          { text: 'Download SDK / Demo', link: '/en/label-printer/download' }
        ]
      },
      { text: 'Customer Display Development', link: '/en/customer-display' },
      { text: 'Electronic Scale Development', link: '/en/electronic-scale' }
    ]
  }
]

export default defineConfig({
  title: '集成开发指南',
  description: '产品 SDK 与开发文档',
  lastUpdated: true,
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
