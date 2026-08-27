[![Node.js CI](https://github.com/KPMP/hubble-web/actions/workflows/node.js.yml/badge.svg)](https://github.com/KPMP/hubble-web/actions/workflows/node.js.yml)

# Inital Setup
- Install NVM (https://github.com/nvm-sh/nvm)
- `$ nvm use v14` // Use Node.js version 14
- (optional) `$ nvm alias default 14` // Set nvm to always use Node.js v14
- `$ npm i` // install required dependencies
- `$ cp .env.example .env`
- `$ npm run start`

## Elasticsearch
Set `REACT_APP_SEARCH_ENDPOINT` to the externally reachable Elasticsearch base URL
(for example, `https://search.example.org:9200`) and set `REACT_APP_SEARCH_KEY` to
an API key restricted to read access on the `spatial-viewer` index. The key is sent
to Elasticsearch from the browser, so do not use an administrative key.

The Elasticsearch server must use HTTPS and allow the deployed app origin through
CORS. For a Docker deployment, the equivalent Elasticsearch settings are:

```yaml
http.cors.enabled: true
http.cors.allow-origin: "https://app.example.org"
http.cors.allow-headers: "X-Requested-With,Content-Type,Content-Length,Authorization"
http.cors.allow-methods: "OPTIONS,HEAD,GET,POST"
```

# Run bundle profiler
- `$ npm run analyze`