/* eslint-disable react/no-array-index-key */
import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const ShowRoom = (props) => {
  const [thumbList , setThumbList] = useState([]);
  const [showRoomName, setShowRoomName] = useState(props.name) ;
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);
  const callShowroomApi =  async (paramValue) =>{  
    console.log('파라메터 -> ',paramValue);
    await axios.post("/api/GetIndustry_Showroom",paramValue)
    .then(function (response) {
      // console.log(response);
      if (response.data.ErrorCode !== 'OK') {
        alert(response.data.Message);
      }
      setThumbList(response.data);
      //showRoomChange(response.data);
      /* 여기에서 데이타 갱신 함수 콜 */ // 여기가 로그인 확인
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const replaceAll = (str,p1,p2) => {
    return str.split(p1).join(p2);
  }
  React.useEffect(() => {
    var param1 = {};
    var category = {};    
    // console.log('ShowRoom : ',  store);
    // console.log(' Name ' , showRoomName);
    setThumbList([]);
    if (showRoomName === "Showroom"){
      if (!(store.SearchCondition.Category1 === "" || store.SearchCondition.Category1 === null || store.SearchCondition.Category1 === undefined)){
        param1.FromDate = replaceAll(store.SearchCondition.FromDate,"-","");
        param1.ToDate = replaceAll(store.SearchCondition.ToDate,"-","");
        param1.Category1 = store.SearchCondition.Category1;
        param1.Category2 = store.SearchCondition.Category2;
        param1.Category3 = store.SearchCondition.Category3;
        param1.Keyword = store.SearchCondition.Keyword;
        callShowroomApi(param1);
      }
    }
    
    
  }, [store]);

  return (
    <>
      <ul>
        {!thumbList.URL || thumbList.URL.length === 0  ? <li> 자료가 없습니다. </li> : thumbList.URL.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.SiteURL} target="_blank" rel="noopener noreferrer">
                <img
                  className="img-fluid border-radius"
                  src={item.ImageURL}
                  alt="thumbnail"
                />
                </a>
              </li>
            );
          }) }
      </ul>
    </>
  );
};

export default ShowRoom;
