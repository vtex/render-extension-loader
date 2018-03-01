interface Window {
  __RENDER_6_RUNTIME__: any,
  __RUNTIME__: any,
  $: any,
  RenderExtensionLoader: any,
}

class RenderExtensionLoader {
  private account: string
  private workspace: string
  private path: string
  private locale: string
  private env: string
  private verbose: any
  private get: any
  private styles: string[]
  private scripts: string[]

  constructor({account, workspace, path, locale, env, verbose}) {
    this.account = account
    this.workspace = workspace
    this.path = path
    this.locale = locale || 'en-US'
    this.verbose = verbose
    this.env = env || /myvtexdev\.com/.test(window.location.hostname) ? 'myvtexdev' : 'myvtex'
    this.get = (window.$ && window.$.get) || window.fetch && ((url) => window.fetch(url).then(res => res.json()))

    if (!this.get) {
      throw new Error('Render Extension Loader requires either jQuery.ajax or window.fetch.')
    }
  }

  public async fetch() {
    if (this.verbose) {
      console.time('render-extension-loader:json')
    }
    const {runtime, styles, scripts} = await this.get(`https://${this.workspace}--${this.account}.${this.env}.com/legacy-extensions${this.path}?__disableSSR&locale=${this.locale}`)
    if (this.verbose) {
      console.timeEnd('render-extension-loader:json')
    }
    this.styles = styles
    this.scripts = scripts
    window.__RUNTIME__ = {
      ...runtime,
      start: false,
    }
    if (this.styles) {
      this.styles.forEach(this.addStyleToPage)
    }
    if (this.verbose) {
      console.time('render-extension-loader:scripts')
    }
    await Promise.all(this.scripts.map(this.addScriptToPage))
    if (this.verbose) {
      console.timeEnd('render-extension-loader:scripts')
    }
    return Object.keys(runtime.extensions)
  }

  public render(extension, props, element) {
    window.__RUNTIME__.extensions[extension].props = {
      ...window.__RUNTIME__.extensions[extension].props,
      ...props,
    }
    if (this.verbose) {
      console.time('render-extension-loader:render')
    }
    window.__RENDER_6_RUNTIME__.render(extension, element)
    if (this.verbose) {
      console.timeEnd('render-extension-loader:render')
    }
  }

  private addScriptToPage(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = resolve
      script.onerror = reject
      script.async = false
      document.head.appendChild(script)
    })
  }

  private addStyleToPage(href) {
    const link = document.createElement('link')
    link.href = href
    link.type = 'text/css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
}

window.RenderExtensionLoader = RenderExtensionLoader