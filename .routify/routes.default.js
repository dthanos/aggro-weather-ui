

export default {
  "meta": {},
  "id": "_default",
  "name": "",
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_forecasts",
      "name": "forecasts",
      "module": false,
      "file": {
        "path": "src/routes/forecasts",
        "dir": "src/routes",
        "base": "forecasts",
        "ext": "",
        "name": "forecasts"
      },
      "children": [
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_forecasts_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/forecasts/index.svelte",
            "dir": "src/routes/forecasts",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/forecasts/index.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {
        "isDefault": true
      },
      "id": "_default_index_svelte",
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_locations",
      "name": "locations",
      "module": false,
      "file": {
        "path": "src/routes/locations",
        "dir": "src/routes",
        "base": "locations",
        "ext": "",
        "name": "locations"
      },
      "children": [
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_locations_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/locations/index.svelte",
            "dir": "src/routes/locations",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/locations/index.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_remote_apis",
      "name": "remote_apis",
      "module": false,
      "file": {
        "path": "src/routes/remote_apis",
        "dir": "src/routes",
        "base": "remote_apis",
        "ext": "",
        "name": "remote_apis"
      },
      "children": [
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_remote_apis_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/remote_apis/index.svelte",
            "dir": "src/routes/remote_apis",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/remote_apis/index.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true,
        "order": false,
        "inline": false
      },
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}