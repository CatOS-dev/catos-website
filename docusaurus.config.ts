import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CatOS',
  tagline: '开箱即用的 Arch 系发行版',
  favicon: 'img/favicon.svg',

  url: 'https://catos.info',
  baseUrl: '/',
  organizationName: 'CatOS-dev',
  projectName: 'catos-website',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/CatOS-dev/catos-website/edit/main/',
        },
        blog: {
          routeBasePath: 'news',
          showReadingTime: true,
          editUrl: 'https://github.com/CatOS-dev/catos-website/edit/main/',
          blogTitle: 'CatOS 动态',
          blogDescription: 'CatOS 发布、开发和社区动态',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'keywords',
        content: 'CatOS, Arch Linux, Calamares, Limine, Btrfs, Snapper, Linux',
      },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'CatOS',
      logo: {
        alt: 'CatOS logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: '文档',
        },
        {
          to: '/docs/download',
          label: '下载',
          position: 'left',
        },
        {
          to: '/news',
          label: '动态',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/CatOS-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '开始使用',
          items: [
            {label: '认识 CatOS', to: '/docs/intro'},
            {label: '下载镜像', to: '/docs/download'},
            {label: '安装系统', to: '/docs/installation/overview'},
          ],
        },
        {
          title: '系统',
          items: [
            {label: '快照与回滚', to: '/docs/system/snapshots'},
            {label: '软件仓库', to: '/docs/package-management/repository'},
            {label: '开发动态', to: '/news'},
          ],
        },
        {
          title: '社区',
          items: [
            {label: 'GitHub', href: 'https://github.com/CatOS-dev'},
            {label: 'Bilibili', href: 'https://space.bilibili.com/342783538'},
            {label: 'QQ群 428382413', href: 'https://qm.qq.com/q/kOKHKg6OmO'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CatOS contributors. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['bash', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
