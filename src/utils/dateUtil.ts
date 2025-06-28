import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn'

dayjs.extend(calendar)
dayjs.extend(quarterOfYear)
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(weekday)

dayjs.locale('zh-cn')

dayjs.updateLocale('zh-cn', {
  calendar: {
    sameDay: 'HH:mm',
    nextDay: '[明天]',
    nextWeek: 'dddd',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'dddd HH:mm',
    sameElse: 'YYYY年M月D日 HH:mm',
  },
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
})

/** 时间工具 */
export const dateUtil = dayjs

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'

/**
 * 格式化日期
 * @param _date 日期对象、时间戳或字符串
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
function _format(_date: dayjs.ConfigType, format: string): string {
  if (!_date) {
    return _date as any
  }
  const date = dateUtil(_date)
  return date.isValid() ? date.format(format) : (_date as string)
}
/**
 * 格式化为日期时间字符串
 * @param date 日期对象、时间戳或字符串
 * @param format 格式字符串，默认为 DATETIME_FORMAT
 * @returns 格式化后的日期时间字符串
 */
export function formatToDatetime(date: dayjs.ConfigType = undefined, format: string = DATETIME_FORMAT): string {
  return _format(date, format)
}

/**
 * 格式化为日期字符串
 * @param date 日期对象、时间戳或字符串
 * @param format 格式字符串，默认为 DATE_FORMAT
 * @returns 格式化后的日期字符串
 */
export function formatToDate(date: dayjs.ConfigType = undefined, format: string = DATE_FORMAT): string {
  return _format(date, format)
}

/**
 * 格式化为日期字符串
 * @param date 日期对象、时间戳或字符串
 * @param format 格式字符串，默认为 TIME_FORMAT
 * @returns 格式化后的日期字符串
 */
export function formatToTime(date: dayjs.ConfigType = undefined, format: string = TIME_FORMAT): string {
  return _format(date, format)
}

/**
 * 时间人性化显示
 * @param date 要格式化的日期
 * @param oppositeDate 参考日期，默认为当前时间
 * @returns 人性化的时间字符串
 */
export function humanizedDate(date: dayjs.ConfigType, oppositeDate: dayjs.ConfigType = undefined): string {
  if (!date || !dateUtil(date).isValid()) {
    return ''
  }

  const now = oppositeDate ? dateUtil(oppositeDate) : dateUtil()
  const diffSeconds = now.diff(date, 'second')
  const diffMinutes = now.diff(date, 'minute')
  const diffHours = now.diff(date, 'hour')
  const diffDays = now.diff(date, 'day')

  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`
  }
  else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`
  }
  else if (diffHours < 24) {
    return `${diffHours}小时前`
  }
  else if (diffDays < 7) {
    return `${diffDays}天前`
  }
  else {
    return formatToDatetime(date)
  }
}

/**
 * 获取时辰问候语
 * @returns 根据当前时间返回相应的问候语
 */
export function getGreeting(): string {
  const currentHour = dateUtil().hour()
  if (currentHour >= 5 && currentHour < 12) {
    return '早上好'
  }
  else if (currentHour >= 12 && currentHour < 14) {
    return '中午好'
  }
  else if (currentHour >= 14 && currentHour < 18) {
    return '下午好'
  }
  else if (currentHour >= 18 && currentHour < 24) {
    return '晚上好'
  }
  else {
    return '深夜了'
  }
}
