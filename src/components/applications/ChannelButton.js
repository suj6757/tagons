import React, { useState , useEffect} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

const ChannelButton = (props) => {
  const [rSelected, setRSelected] = useState(null);
  const [checkSelected, setCheckSelected] = useState([]);
  const [selectArray, setSelectArray] = useState([]);
  const [socialDataTitle,setSocialDataTitle] = useState([]); 
  const [socialDataList,setSocialDataList] = useState([]); 
  const [onlineShopData,setOnlineShopData] = useState([]); 
  const [googleAnalData,setGoogleAnalData] = useState([]); 

  var socialData = [];
  const tabTitle = ['Social', 'Online Shopping', 'Google Analytics'];
 

  const onCheckboxBtnClick = (id, name, type) => {
    const checkFunc = selectArray.findIndex((item)=> item.id === id);
    // console.log('onCheckboxBtnClick 1',checkSelected, selectArray);
    if (checkFunc < 0) {
        selectArray.push({id, name, type});
        checkSelected.push(id);
    } else {
        selectArray.splice(checkFunc , 1);
        checkSelected.splice(checkFunc , 1);
    }

    setCheckSelected([...checkSelected]);
    setSelectArray([...selectArray]);
    // console.log('onCheckboxBtnClick 2',checkSelected, selectArray);
  };
    
  const tagRemoveBtn = (id) =>{ 
    // console.log('tagRemoveBtn1',id,checkFunc,selectArray);
    const checkFunc = selectArray.findIndex((item)=> item.id === id);
    // console.log('tagRemoveBtn2',id,checkFunc,selectArray,checkSelected);
    selectArray.splice(checkFunc , 1);
    checkSelected.splice(checkFunc , 1);
    setCheckSelected([...checkSelected]);
    setSelectArray([...selectArray]);
  }

  const resetArray = (id) => {
      setCheckSelected([]);
      setSelectArray([]);
      setRSelected(id);        
  }

  const setChannelSelected = (id) => {
      setRSelected(id);        
  }

  useEffect(() => {
    var OnlineShopping = [];
    var Social = {};
    var socialTitle = [];
    var oldChannelType = '';
    var allIdx = 0;
    axios.post("/common/GetChannel_List")
    .then((response) => {
        if (response.data.ErrorCode === 'OK'){    
          response.data.OnlineShopping.forEach(function(item,idx){
            allIdx += 1;
            OnlineShopping.push({id: allIdx, name: item.Channel , type:'Online Shopping'});
          });
          // console.log('OnlineShopping List', OnlineShopping);
          response.data.Social.forEach(function(item,idx){
            if (oldChannelType != item.ChannelType){
              oldChannelType = item.ChannelType;
              Social[oldChannelType] =[];
            }
            allIdx += 1;
            Social[oldChannelType].push({id:allIdx,name:item.Channel,ChannelType:item.ChannelType,type:'Social'});
          });
          socialTitle = Object.keys(Social);
          // console.log('SocialDataTitle List', Object.keys(Social),socialDataTitle);
          socialTitle.forEach(function(item,idx){
            socialData.push(Social[item]);
          });
          setSocialDataList(socialData);
        }
        else{
          console.log('prime 조회조건 error');
        }
        setOnlineShopData(OnlineShopping);
        setSocialDataTitle(socialTitle);
        setSocialDataList(socialData);
        allIdx += 1;
        setGoogleAnalData([{id: allIdx, name: 'Google Analytics',type:'Google Analytics'}]);
    })
    .catch(function (error) {
        console.log(error);
    });

  }, []);
  useEffect(() => {
    console.log('socialDataTitle change', socialDataTitle,socialDataList);
  }, [socialDataTitle]);
  useEffect(() => {
    if (props.searchBtnClick){
      console.log('ChannelButton click');
      props.searchStart(selectArray);
    }
  }, [props.searchBtnClick]);
  return (
    <>
      <div className='channel_header'>
      {tabTitle.map((title, idx) => {
          return(
            // eslint-disable-next-line react/no-array-index-key
            <Button key={idx} color='h_tab' onClick={() => setChannelSelected(idx)} active={rSelected === idx}>{title}</Button>
          )
      })}
      </div>

      <div className={`channel_cont ${rSelected === 0 ? ' active': ''}`}>
        <table className='tbl_social'>
            <tbody>
                {socialDataList.map((list, idx) => {
                    return(
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={idx}>
                            <th>{socialDataTitle[idx]}</th>
                            <td>
                                {list.map(item => {
                                    return (
                                        <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name, item.type)} active={checkSelected.includes(item.id)}>{item.name}</Button>
                                    )
                                })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <ul className='list_tag'>
            {selectArray.map((item, idx) =>{
                return(
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={idx}>{item.name} <Button close onClick={() => tagRemoveBtn(item.id)} /></li>
                )
            })}
        </ul>
      </div>

      <div className={`channel_cont ${rSelected === 1 ? ' active': ''}`}>
        <table className='tbl_social'>
            <tbody>
                <tr>
                    <td>
                        {onlineShopData.map((item) => {
                            return(
                                <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name, item.type)} active={checkSelected.includes(item.id)}>{item.name}</Button>
                            )
                        })}
                    </td>
                </tr>
            </tbody>
        </table>
        
        <ul className='list_tag'>
            {selectArray.map((item, idx) =>{
                return(
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={idx}>{item.name} <Button close onClick={() => tagRemoveBtn(item.id)} /></li>
                )
            })}
        </ul>
      </div>

      <div className={`channel_cont ${rSelected === 2 ? ' active': ''}`}>
        <table className='tbl_social'>
            <tbody>
                <tr>
                    <td>
                        {googleAnalData.map((item) => {
                            return(
                                <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name, item.type)} active={checkSelected.includes(item.id)}>{item.name}</Button>
                            )
                        })}
                    </td>
                </tr>
            </tbody>
        </table>
        <ul className='list_tag'>
            {selectArray.map((item, idx) =>{
                return(
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={idx}>{item.name} <Button close onClick={() => tagRemoveBtn(item.id)} /></li>
                )
            })}
        </ul>
      </div>      
    </>
  );


}

export default ChannelButton;