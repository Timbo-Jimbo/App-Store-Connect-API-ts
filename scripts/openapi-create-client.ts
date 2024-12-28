import { createClient, defaultPlugins } from '@hey-api/openapi-ts';

createClient({
  client: '@hey-api/client-fetch',
  input: 'app_store_connect_api_3.7.0_openapi.json',
  output: {
    path: 'src/client',
    format: 'prettier'
  },
  logs: {
    level: 'error'
  },
  experimentalParser: true,
  plugins: [
    ...defaultPlugins,
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/transformers',
      dates: true,
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
      auth: false,
    }
  ]
});