import moment from 'moment';

/// 개발자 추가한 Util.

/// 해당 DateFormat 형식의 날짜 반환, 기본값 "YYYY-MM-DD"
export function changeDate(date, format = "YYYY-MM-DD") {
  const publishDate = moment(date).format(format);
  return publishDate;
}
