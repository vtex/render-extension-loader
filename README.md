# :construction: DEPRECATED - Please contact guilherme@vtex.com if you need to use this. :upside_down_face:  

# render-extension-loader

Use render components from the comfort of your client-side code.

### Quickstart

Create an app that serves a page under `/legacy-extensions/` path on `myvtex.com`.

```
// pages/pages.json
{
    "pages": {
        "legacy-getting-started": {
            "path": "/legacy-extensions/render-example",
            "theme": "theme"
        },
    },
    "extensions": {
        "legacy-getting-started": {
            "component": "index"
        },
    }
}
```

Assuming you're logged in the account `basedevmkp` and workspace `loader` with this app installed, you can use `window.RenderExtensionLoader` to load and render that extension point.

```
<div id="getting-started"></div>
<script>
var loader = new RenderExtensionLoader({
    account: 'basedevmkp',
    workspace: 'loader',
    path: '/render-example',
    locale: 'pt-BR',
    verbose: true,
})
loader.load().then(function (data) {
    console.log(data) // runtime
    loader.render('legacy-getting-started', document.getElementById('getting-started'))
})
</script>
```

You can call `loader.render` passing a third argument, `props`, which will trigger a re-render of your extension point.

### Important: setting `publicEndpoint` when developing on staging

If you're logged in the toolbelt with a `@vtex.com.br` email address, you are automatically configured to use the `staging` environment, which serves all traffic through the alternate `myvtexdev.com` (as opposed to `myvtex.com` for prod traffic).

This means that during development, if you are linking your app in the `staging` environment, you *must* pass the `publicEndpoint` option to `RenderExtensionLoader` with the value of `myvtexdev.com`. Otherwise, your assets will be fetched from the production env and there might be inconsistencies during development, i.e. you will not see changes immediately.

So, during development simply pass this option to guarantee the loader will point towards the correct public endpoint:

```
var loader = new RenderExtensionLoader({
    account: 'basedevmkp',
    workspace: 'loader',
    path: '/render-example',
    locale: 'pt-BR',
    publicEndpoint: 'myvtexdev.com',
    verbose: true,
})
```

### Install

From *unpkg.com*: 

https://unpkg.com/@vtex/render-extension-loader/lib/render-extension-loader.js
