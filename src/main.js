import plugin from '../plugin.json';

class AcodePlugin {
  constructor() {
    this.webview = null; // Store the reference to the webview
  }

  async init($page, cacheFile, cacheFileUrl) {
    // Create a floating webview container
    this.createFloatingWebview();

    // Add a test URL for the webview
    this.loadWebviewURL('https://example.com');
  }

  async destroy() {
    // Clean up by removing the webview
    if (this.webview) {
      this.webview.remove();
      this.webview = null;
    }
  }

  createFloatingWebview() {
    // Check if a webview already exists
    if (this.webview) return;

    // Create a floating div for the webview
    this.webview = document.createElement('div');
    this.webview.style.position = 'fixed';
    this.webview.style.top = '10%';
    this.webview.style.left = '10%';
    this.webview.style.width = '80%';
    this.webview.style.height = '80%';
    this.webview.style.zIndex = '10000';
    this.webview.style.backgroundColor = '#fff';
    this.webview.style.border = '2px solid #000';
    this.webview.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    this.webview.style.borderRadius = '8px';
    this.webview.style.overflow = 'hidden';

    // Add an iframe for the browser
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    this.webview.appendChild(iframe);

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.background = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '24px';
    closeButton.style.height = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      this.webview.remove();
      this.webview = null;
    });
    this.webview.appendChild(closeButton);

    // Append the webview to the body
    document.body.appendChild(this.webview);
  }

  loadWebviewURL(url) {
    if (this.webview) {
      const iframe = this.webview.querySelector('iframe');
      if (iframe) {
        iframe.src = url;
      }
    }
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
