import { ref, Ref } from 'vue'
import { getEnvBaseUploadUrl } from '@/utils'

const VITE_UPLOAD_BASEURL = `${getEnvBaseUploadUrl()}`

type TfileType = 'image' | 'file'
type TImage = 'png' | 'jpg' | 'jpeg' | 'webp' | '*'
type TFile = 'doc' | 'docx' | 'ppt' | 'zip' | 'xls' | 'xlsx' | 'txt' | TImage

type TOptions<T extends TfileType> = {
  formData?: Record<string, any>
  maxSize?: number
  accept?: T extends 'image' ? TImage[] : TFile[]
  fileType?: T
  success?: (params: any) => void
  error?: (err: any) => void
}

export default function useUpload<T extends TfileType>(options: TOptions<T> = {} as TOptions<T>) {
  const {
    formData = {},
    maxSize = 5 * 1024 * 1024,
    accept = ['*'],
    fileType = 'image',
    success,
    error: onError,
  } = options

  const loading = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<any>(null)

  const run = () => {
    // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
    // 微信小程序在2023年10月17日之后，使用本API需要配置隐私协议
    const chooseFileOptions = {
      count: 1,
      success: (res: any) => {
        handleFileChoose({ tempFilePath: res.tempFilePaths[0], tempFiles: res.tempFiles[0] })
      },
      fail: (err: any) => {
        console.error('File selection failed:', err)
        error.value = err
        onError?.(err)
      },
    }

    if (fileType === 'image') {
      // #ifdef MP-WEIXIN
      uni.chooseMedia({
        ...chooseFileOptions,
        mediaType: ['image'],
      })
      // #endif

      // #ifndef MP-WEIXIN
      uni.chooseImage(chooseFileOptions)
      // #endif
    } else {
      uni.chooseFile({
        ...chooseFileOptions,
        type: 'all',
      })
    }
  }

  const handleFileChoose = (file: {
    tempFilePath: string
    tempFiles?: { size?: number; name?: string }
  }) => {
    if (file?.tempFiles?.size && file.tempFiles.size > maxSize) {
      uni.showToast({
        title: `文件大小不能超过 ${maxSize / 1024 / 1024}MB`,
        icon: 'none',
      })
      return
    }

    const fileExtension = file?.tempFiles?.name?.split('.').pop()?.toLowerCase()
    const isTypeValid = accept.some((type) => type === '*' || type.toLowerCase() === fileExtension)

    if (!isTypeValid) {
      uni.showToast({
        title: `仅支持 ${accept.join(', ')} 格式的文件`,
        icon: 'none',
      })
      return
    }

    loading.value = true
    uploadFile({
      tempFilePath: file.tempFilePath,
      formData,
      onSuccess: (res) => {
        data.value = res
        // https://oss.laf.run/ukw0y1-unibest/unibest.f5308ecd-06c3-463b-b3e0-5df08154c7f3.svg
        // console.log('上传成功', res)
        success?.(res)
      },
      onError: (err) => {
        error.value = err
        onError?.(err)
      },
      onComplete: () => {
        loading.value = false
      },
    })
  }

  return { loading, error, data, run }
}

async function uploadFile({
  tempFilePath,
  formData,
  onSuccess,
  onError,
  onComplete,
}: {
  tempFilePath: string
  formData: Record<string, any>
  onSuccess: (data: any) => void
  onError: (err: any) => void
  onComplete: () => void
}) {
  uni.uploadFile({
    url: VITE_UPLOAD_BASEURL,
    filePath: tempFilePath,
    name: 'file',
    formData,
    success: (uploadFileRes) => {
      try {
        const data = uploadFileRes.data
        onSuccess(data)
      } catch (err) {
        onError(err)
      }
    },
    fail: (err) => {
      console.error('Upload failed:', err)
      onError(err)
    },
    complete: onComplete,
  })
}
