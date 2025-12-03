// 枚举定义

export enum TestEnum {
  A = '1',
  B = '2',
}

// uni.uploadFile文件上传参数
export interface IUniUploadFileOptions {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

/** 工具类型：删除字符串开头的第一个斜杠 */
export type RemoveLeadingSlash<S extends string> = S extends `/${infer Rest}` ? Rest : S

/** 工具类型：删除联合类型中每个字符串的第一个斜杠 */
export type RemoveLeadingSlashFromUnion<T extends string> = T extends any ? RemoveLeadingSlash<T> : never
