import type { GenerateServiceProps } from 'openapi-ts-request'

export default [
  {
    schemaPath: 'http://petstore.swagger.io/v2/swagger.json',
    serversPath: './src/service/app',
    requestLibPath: `import { request } from '@/utils/http';\n import { CustomRequestOptions } from '@/interceptors/request';`,
    requestOptionsType: 'CustomRequestOptions',
    isGenJavaScript: false,
  },
] as GenerateServiceProps[]
