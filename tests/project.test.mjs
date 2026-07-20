import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const exists = async (path) => {
  try {
    await stat(new URL(`../${path}`, import.meta.url));
    return true;
  } catch {
    return false;
  }
};

test('project exposes the expected development workflow', async () => {
  const pkg = JSON.parse(await read('package.json'));
  assert.equal(pkg.name, 'catos-website');
  for (const script of ['start', 'build', 'serve', 'typecheck', 'test']) {
    assert.equal(typeof pkg.scripts?.[script], 'string', `missing script: ${script}`);
  }
});

test('site configuration uses the current CatOS organization and bilingual locales', async () => {
  const config = await read('docusaurus.config.ts');
  assert.match(config, /CatOS-dev/);
  assert.match(config, /zh-Hans/);
  assert.match(config, /en/);
  assert.doesNotMatch(config, /CatOS-Home/);
});

test('homepage keeps the original CatOS visual structure', async () => {
  const homepage = await read('src/pages/index.tsx');
  for (const text of ['CatOS', '开箱即用的 Arch 系发行版', '立即下载', '开箱即用', '安装简便', '用户友好', '生态丰富', '流畅稳定']) {
    assert.match(homepage, new RegExp(text), `homepage is missing ${text}`);
  }
  for (const asset of ['out_of_box.svg', 'easy_to_install.svg', 'user_friendly.svg', 'store.svg', 'fast_and_stable.svg']) {
    assert.match(homepage, new RegExp(`/img/${asset.replace('.', '\\.')}`), `homepage does not use ${asset}`);
  }
  assert.doesNotMatch(homepage, /PillarGrid|heroPreview|galleryImages|不是安装脚本的集合|熟悉，但不粗糙/);
});

test('core documentation exists', async () => {
  for (const path of [
    'docs/intro.md',
    'docs/download.md',
    'docs/installation/overview.md',
    'docs/system/snapshots.md',
    'docs/package-management/repository.md',
  ]) {
    assert.equal(await exists(path), true, `missing ${path}`);
  }
});

test('the original website resource set is preserved', async () => {
  for (const path of [
    'static/img/logo.svg',
    'static/img/favicon.svg',
    'static/img/bg3.avif',
    'static/img/out_of_box.svg',
    'static/img/easy_to_install.svg',
    'static/img/user_friendly.svg',
    'static/img/store.svg',
    'static/img/fast_and_stable.svg',
    'static/img/qrcode_catos.jpg',
    'static/img/wechat.jpg',
    'static/img/docs/install_catos_01.png',
    'static/img/screenshots/01.png',
  ]) {
    assert.equal(await exists(path), true, `missing ${path}`);
  }
});
