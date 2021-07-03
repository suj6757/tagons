import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import IntlMessages from '../../helpers/IntlMessages';

registerLocale("ko", ko);

const VerticalHeading = ({ thumb, className, intl }) => {
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const { messages } = intl;

  // 요일 반환 
  const getDayName = (date) => { 
    return date.toLocaleDateString('ko-KR', { weekday: 'long', }).substr(0, 1); 
  } 
  // 날짜 비교시 년 월 일까지만 
  const createDate = (date) => { 
    return new Date(new Date(date.getFullYear() , date.getMonth() , date.getDate() , 0 , 0 , 0)); 
  }

  return (
    <>
      <div className="tbl-vertical-heading">
        <table>
            <tbody>
                <tr>
                    {/* vertical유형의 테이블 th 값은 인라인 스타일로 지정 바랍니다. */}
                    <th style={{ width:'160px' }}>Period</th>
                    <td colSpan="3">
                      <DatePicker
                        locale="ko"
                        dateFormat="yyyy-MM-dd(eee)"
                        selected={startDateRange}
                        selectsStart
                        startDate={startDateRange}
                        endDate={endDateRange}
                        onChange={setStartDateRange}
                        shouldCloseOnSelect={false}
                        useWeekdaysShort
                        placeholderText={messages['form-components.start']}
                        // 토요일, 일요일 색깔 바꾸기 위함 
                        dayClassName={date => 
                          getDayName(createDate(date)) === '토' ? "saturday" : 
                          getDayName(createDate(date)) === '일' ? "sunday" : undefined 
                        }
                      />
                      <DatePicker
                        locale="ko"
                        dateFormat="yyyy.MM.dd(eee)"
                        selected={endDateRange}
                        selectsEnd
                        startDate={startDateRange}
                        endDate={endDateRange}
                        onChange={setEndDateRange}
                        shouldCloseOnSelect={false}
                        useWeekdaysShort
                        placeholderText={messages['form-components.end']}
                        // 토요일, 일요일 색깔 바꾸기 위함 
                        dayClassName={date => 
                          getDayName(createDate(date)) === '토' ? "saturday" : 
                          getDayName(createDate(date)) === '일' ? "sunday" : undefined 
                        }
                      />
                    </td>
                </tr>
                <tr>
                    <th style={{ width:'160px' }}>Product(上) Category</th>
                    <td />
                    <th style={{ width:'160px' }}>Product(下) Category</th>
                    <td>No Keywords</td>
                </tr>
            </tbody>
        </table>
      </div>
    </>
  );
};
export default VerticalHeading;
