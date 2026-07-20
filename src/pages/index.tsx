import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type Feature = {
  title: string;
  description: string;
  icon: string;
  alt: string;
};

function FeatureList({items}: {items: Feature[]}): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {items.map((item) => (
            <article className={styles.feature} key={item.title}>
              <img className={styles.featureIcon} src={item.icon} alt={item.alt} />
              <Heading as="h2" className={styles.featureTitle}>
                {item.title}
              </Heading>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const features: Feature[] = [
    {
      title: translate({id: 'home.feature.ready.title', message: '开箱即用'}),
      description: translate({
        id: 'home.feature.ready.description',
        message: '完成安装即可进入配置完整的桌面环境。中文输入、常用组件、软件源和硬件支持不必再从零拼装。',
      }),
      icon: '/img/out_of_box.svg',
      alt: translate({id: 'home.feature.ready.alt', message: '开箱即用图标'}),
    },
    {
      title: translate({id: 'home.feature.install.title', message: '安装简便'}),
      description: translate({
        id: 'home.feature.install.description',
        message: 'CatOS 使用定制的 Calamares 图形安装程序，将桌面、磁盘布局和启动方案放在清楚的安装流程中。',
      }),
      icon: '/img/easy_to_install.svg',
      alt: translate({id: 'home.feature.install.alt', message: '安装简便图标'}),
    },
    {
      title: translate({id: 'home.feature.friendly.title', message: '用户友好'}),
      description: translate({
        id: 'home.feature.friendly.description',
        message: '默认配置以日常使用为目标，同时保留 Arch Linux 的开放性，让新用户容易上手，也不限制熟悉系统的用户。',
      }),
      icon: '/img/user_friendly.svg',
      alt: translate({id: 'home.feature.friendly.alt', message: '用户友好图标'}),
    },
    {
      title: translate({id: 'home.feature.ecosystem.title', message: '生态丰富'}),
      description: translate({
        id: 'home.feature.ecosystem.description',
        message: '继承 Arch Linux 的软件生态，并通过 CatOS 仓库交付发行版集成、桌面预设、主题和系统工具。',
      }),
      icon: '/img/store.svg',
      alt: translate({id: 'home.feature.ecosystem.alt', message: '生态丰富图标'}),
    },
    {
      title: translate({id: 'home.feature.stable.title', message: '流畅稳定'}),
      description: translate({
        id: 'home.feature.stable.description',
        message: '系统围绕 Btrfs、Snapper 和启动快照进行集成，在保持滚动更新体验的同时提供清晰的恢复路径。',
      }),
      icon: '/img/fast_and_stable.svg',
      alt: translate({id: 'home.feature.stable.alt', message: '流畅稳定图标'}),
    },
  ];

  return (
    <Layout
      title={siteConfig.title}
      description="CatOS 是一个基于 Arch Linux、开箱即用的桌面 Linux 发行版。">
      <main>
        <header className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroInner}`}>
            <Heading as="h1" className={styles.heroTitle}>
              CatOS
            </Heading>
            <p className={styles.heroSubtitle}>
              <Translate id="home.hero.subtitle">开箱即用的 Arch 系发行版</Translate>
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/download">
                <Translate id="home.hero.download">立即下载 ⬇️</Translate>
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                <Translate id="home.hero.learn">了解更多 ↗️</Translate>
              </Link>
            </div>
          </div>
        </header>

        <FeatureList items={features} />

        <section className={styles.introduction}>
          <div className={`container ${styles.introductionInner}`}>
            <Heading as="h2" className={styles.introductionTitle}>
              <Translate id="home.introduction.prefix">基于 Arch Linux、</Translate>
              <strong><Translate id="home.introduction.highlight">开箱即用</Translate></strong>
              <Translate id="home.introduction.suffix">的 Linux 发行版，提供完整、清晰并且可恢复的桌面体验</Translate>
            </Heading>
            <p className={styles.introductionText}>
              <Translate id="home.introduction.description">
                CatOS 整理了安装器、桌面预设、软件仓库、Btrfs 快照和启动流程，让这些组件作为同一个发行版协同工作。
              </Translate>
            </p>
            <div className={styles.introductionActions}>
              <Link className="button button--primary button--lg" to="/docs/download">
                <Translate id="home.introduction.download">立即下载</Translate>
              </Link>
              <Link
                className="button button--secondary button--lg"
                href="https://space.bilibili.com/342783538">
                <Translate id="home.introduction.video">视频演示</Translate>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
