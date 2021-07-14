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
  // api 호출시 로딩바 적용 테스트
  const [loading, setLoading] = useState(false);
  const [loaderror, setLoadError] = useState(null);

  const callShowroomApi =  async (paramValue) =>{  
    setLoading(true);
    await axios.post("/industry/GetIndustry_Showroom",paramValue)
    .then(function (response) {
      setThumbList(response.data);
      setLoading(false);
    })
    .catch(function (error) {
      setLoading(false);
      console.log(error);
    });
  };
  const replaceAll = (str,p1,p2) => {
    return str.split(p1).join(p2);
  }
  React.useEffect(() => {
    var param1 = {};
    var category = {};  
    var {SearchChart} = store;
    console.log('ShowRoom : ', store.SearchChart);
    
    if (store.SearchChart.ShowRoom === true){
      setThumbList([]);
      param1.FromDate = replaceAll(store.SearchCondition.FromDate,"-","");
      param1.ToDate = replaceAll(store.SearchCondition.ToDate,"-","");
      param1.Category1 = store.SearchCondition.Category1;
      param1.Category2 = store.SearchCondition.Category2;
      param1.Category3 = store.SearchCondition.Category3;
      param1.Keyword = store.SearchCondition.Keyword;
      callShowroomApi(param1);
    }
  }, [store.SearchCondition]);
  if (loading) return <div className="loading" />;
  if (loaderror) return <div>에러가 발생했습니다</div>;
  return (
    <>
      <ul>
        {!thumbList.URL || thumbList.URL.length === 0  ? <li> 자료가 없습니다. </li> : thumbList.URL.map((item, index) => {
            return (
              <li key={index}>
                <span>{index+1}</span>
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
