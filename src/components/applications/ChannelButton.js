import React, { useState } from 'react';
import { Button } from 'reactstrap';

const ChannelButton = () => {
    const [rSelected, setRSelected] = useState(null);
    const [checkSelected, setCheckSelected] = useState([]);
    const [selectArray, setSelectArray] = useState([]);

    const socialDataTitle = [ 'Naver', 'Daum', 'SNS', 'Community']

    const Naverdata =[
        {id: 1, name: 'Naver_News'},
        {id: 2, name: 'Naver_Blog'},
        {id: 3, name: 'Naver_Cafe'},
        {id: 4, name: 'Naver_Kin'},
        {id: 5, name: 'Naver_Post'},
    ]

    const daumData = [
        {id: 6, name: 'Daum_News'},
        {id: 7, name: 'Daum_Cafe'},
    ]

    const snsData = [
        {id: 8, name: 'Instagram'},
        {id: 9, name: 'Facebook'},
        {id: 10, name: 'Youtube'},
    ]

    const commData = [
        {id: 11, name: 'Ppomppu'},
        {id: 12, name: 'Todayhumor'},
        {id: 13, name: 'Clien'},
        {id: 14, name: 'Mlbpark'},
        {id: 15, name: '82cook'},
    ]    

    const onlineShopData = [
        {id: 1, name: 'Naver_Shopping'},
        {id: 2, name: 'Coupang'},
        {id: 3, name: '11st'},
        {id: 4, name: 'Gmarket'},
        {id: 5, name: 'Auction'},
        {id: 6, name: 'Wemakeprice'},
        {id: 7, name: 'Timon'},
        {id: 8, name: 'Lotte'},
        {id: 9, name: 'Shinsegae'},
        {id: 10, name: 'Traders'},
        {id: 11, name: 'Cjmall'},
        {id: 12, name: 'Gs Shop'},
    ]

    const googleAnalData = [
        {id: 1, name: 'Google Analytics'},
    ]
    
    const socialData = [ Naverdata, daumData, snsData, commData ]
    const tabTitle = ['Social', 'Online Shopping', 'Google Analytics']
   

    const onCheckboxBtnClick = (id, name) => {
        const checkFunc = selectArray.findIndex((item)=> item.id === id);

        if (checkFunc < 0) {
            selectArray.push({id, name});
            checkSelected.push(id);
        } else {
            selectArray.splice(checkFunc , 1);
            checkSelected.splice(checkFunc , id);
        }

        setCheckSelected([...checkSelected]);
        setSelectArray([...selectArray]);
      }
      
    const tagRemoveBtn = (id) =>{
        const checkFunc = selectArray.findIndex((item)=> item.id === id);
        
        selectArray.splice(checkFunc , 1);
        checkSelected.splice(checkFunc , id);

        setSelectArray([...selectArray]);
    }

    const resetArray = (id) => {
        setCheckSelected([]);
        setSelectArray([]);
        setRSelected(id);        
    }

  return (
    <>
      <div className='channel_header'>
      {tabTitle.map((title, idx) => {
          return(
            // eslint-disable-next-line react/no-array-index-key
            <Button key={idx} color='h_tab' onClick={() => resetArray(idx)} active={rSelected === idx}>{title}</Button>
          )
      })}
      </div>

      <div className={`channel_cont ${rSelected === 0 ? ' active': ''}`}>
        <table className='tbl_social'>
            <tbody>
                {socialData.map((list, idx) => {
                    return(
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={idx}>
                            <th>{socialDataTitle[idx]}</th>
                            <td>
                                {list.map(item => {
                                    return (
                                        <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name)} active={checkSelected.includes(item.id)}>{item.name}</Button>
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
                                <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name)} active={checkSelected.includes(item.id)}>{item.name}</Button>
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
                                <Button color="items" key={item.id} onClick={() => onCheckboxBtnClick(item.id, item.name)} active={checkSelected.includes(item.id)}>{item.name}</Button>
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