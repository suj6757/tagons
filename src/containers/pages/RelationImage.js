import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const RelationImage = (props) =>  {
  const [thumbList , setThumbList] = useState([]);
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);
  useEffect(() => {
    console.log('11111',store2.iPfactorGiRelatedwords);
    if (store2.iPfactorGiRelatedwords === undefined  || store2.iPfactorGiRelatedwords === null || store2.iPfactorGiRelatedwords === "" ) {
      setThumbList([]);
    }
    else{
       setThumbList(store2.iPfactorGiRelatedwords.Data);
    }
    
  } , [store2.iPfactorGiRelatedwords]);
  return (
    <>
      {thumbList.map((item,index) => {
        return (
          <div key={index} >
            <p>{item.RelatedWord}</p>
            <a href={item.SiteURL} target="_blank" rel="noopener noreferrer">
            <img
              className="img-fluid border-radius"
              src={item.ImageURL}
              alt="thumbnail"
            />
             </a>
          </div>
        );
      })}
    </>
  );
}

export default RelationImage;
