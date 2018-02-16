

class RenderExtensionLoader {
  private account: string
  private workspace: string
  private path: string
  private ajax: any
  private styles: string[]
  private scripts: string[]
  private placeholders: Map<string, string>

  constructor({account, workspace, path}) {
    this.account = account
    this.workspace = workspace
    this.path = path
    this.ajax = (window.$ && window.$.get) || window.fetch
  }

  public async fetch(locale = 'en-US') {
    const {placeholders, runtime, styles, scripts} = await this.ajax(`https://${this.workspace}--${this.account}.myvtex.com/legacy-extensions${this.path}?__disableSSR&locale=${locale}`)
    this.styles = styles
    this.scripts = scripts
    this.placeholders = placeholders
    window.__RUNTIME__ = Object.assign(runtime, {start: false})
    this.styles.forEach(this.addStyleToPage)
    await Promise.all(this.scripts.map(this.addScriptToPage))
    return Object.keys(this.placeholders)
  }

  public render(extension, props, element) {
    window.__RUNTIME__.extensions[extension].props = {
      ...window.__RUNTIME__.extensions[extension].props,
      props,
    }
    return window.__RENDER_6_RUNTIME__.render(extension, element)
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
export default RenderExtensionLoader