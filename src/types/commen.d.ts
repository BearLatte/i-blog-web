import request from '@/utils/request'
import message from '@/utils/message'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $request: (config: RequestConfig) => Promise<AxiosResponse<any, any> | null>
    $indicator: message
  }
}
