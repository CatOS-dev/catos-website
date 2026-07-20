import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'why',
    'desktops',
    'download',
    {
      type: 'category',
      label: '安装',
      items: [
        'installation/overview',
        'installation/preparation',
        'installation/offline-installation',
        'installation/online-installation',
        'installation/partitioning',
        'installation/boot-and-snapshots',
        'installation/hardware-drivers',
        'installation/post-installation',
      ],
    },
    {
      type: 'category',
      label: '使用',
      items: [
        'usage/pacman',
        'usage/discover',
        'usage/aur',
        'usage/update',
        'usage/shortcuts',
      ],
    },
    {
      type: 'category',
      label: '系统维护',
      items: ['system/snapshots'],
    },
    {
      type: 'category',
      label: '软件与仓库',
      items: ['package-management/repository'],
    },
  ],
};

export default sidebars;
