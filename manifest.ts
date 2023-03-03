import packageJson from './package.json';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Plain English Research Paper',
  version: packageJson.version,
  description: packageJson.description,
  action: {
    default_icon: 'icon-34.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  permissions: ['storage', 'unlimitedStorage'],
  options_page: 'src/pages/options/index.html',
  background: { service_worker: 'src/pages/background/index.js' },
  content_scripts: [
    {
      matches: [
        'https://paperswithcode.com/paper/*',
        'https://arxiv.org/abs/*',
      ],
      js: ['src/pages/content/index.js'],
      css: ['assets/css/contentStyle.chunk.css'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
      ],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
