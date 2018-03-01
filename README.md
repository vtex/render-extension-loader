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

Assuming you're logged in the account `basedevmkp` and workspace `loader` with this app installed, you can use `window.RenderExtensionLoader` to fetch and render that extension point.

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
loader.fetch().then(function (data) {
    console.log(data) // all extension points in this page.
    loader.render('legacy-getting-started', document.getElementById('getting-started'))
})
</script>
```

You can call `loader.render` passing a third argument, `props`, which will trigger a re-render of your extension point.

### Install

From *unpkg.com*: 

https://unpkg.com/@vtex/render-extension-loader/lib/render-extension-loader.js