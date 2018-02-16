declare global {
  interface Window {
    __RENDER_6_RUNTIME__: any,
    __RUNTIME__: any,
    $: any,
    RenderExtensionLoader: any
  }
}

import RenderExtensionLoader from './render-extension-loader'
export default RenderExtensionLoader