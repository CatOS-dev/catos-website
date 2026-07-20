import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'download',
    {
      type: 'category',
      label: '安装',
      items: ['installation/overview'],
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
