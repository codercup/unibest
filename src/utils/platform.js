/*
 * @Author: 菲鸽
 * @Date: 2024-03-28 19:13:55
 * @Last Modified by: 菲鸽
 * @Last Modified time: 2024-03-28 19:24:55
 */
export const platform = __UNI_PLATFORM__
export const isH5 = __UNI_PLATFORM__ === 'h5'
export const isApp = __UNI_PLATFORM__ === 'app'
export const isMp = __UNI_PLATFORM__.startsWith('mp-')
const PLATFORM = {
  platform,
  isH5,
  isApp,
  isMp,
}
export default PLATFORM
