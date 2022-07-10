const pluginId = 'acode.plugin';

class AcodePlugin {

  async init() {

  }

  async destroy() {

  }
}

if (window.acode) {
  const plugin = new AcodePlugin();
  acode.setPluginInit(pluginId, (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    plugin.baseUrl = baseUrl;
    plugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(pluginId, () => {
    plugin.destroy();
  });
}