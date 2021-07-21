/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import axios from 'axios';

const RenderRow = props => {

  const tableObjectVal = Object.values(props.data);
  return (
    <>
      {props.idx === 0 ? (
        <td rowSpan={props.rows}>
          {props.keys}
        </td>
      ) : null}
      <>
        {tableObjectVal.map((val) => {
            const valueSet = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return (
                <>
                {String(props.keys) !== String(val) ? <td>{valueSet}</td> : false }
                </>
            );
        })}
      </>
    </>
  );
};

class ChannelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCondition : {},
      tableDataHeader: [
        // eslint-disable-next-line no-dupe-keys
        { 'Channel Category': "", Channel: "", 'Post(product)' : "", "Comment(Review)": '-', "View": '-', 'List(Cart)': "", 'Press': "", 'Positive Rate': "", 'Negative Rate': ""},
      ],
      tableData: [
        // eslint-disable-next-line no-dupe-keys
        /*{ 'Channel Category': "Search Volume", Channel: "Naver", 'Post(product)' : 447, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70},
        { 'Channel Category': "Social", Channel: "Naver News", 'Post(product)' : 1275, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70},
        { 'Channel Category': "Social", Channel: "Naver Blog", 'Post(product)' : 1275, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Instargram", 'Post(product)' : 1138, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Facebook", 'Post(product)' : 1198, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Youtube", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Shopping", Channel: "Navete shopping", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "E-Commerce", Channel: "Coupang", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 }, */
      ]
    };
  }

  componentDidUpdate(){
    if (this.props.searchStartFlag){
      this.props.setSearchStartFlag(false);
      
      this.getTableData();
    }
  }

  getKeys = () => {
    const { tableDataHeader } = this.state;
    return Object.keys(tableDataHeader[0]);
  };

  getHeader = () => {
    const keys = this.getKeys();
    return keys.map((key) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = () => {
    const { tableData } = this.state;
    const keys = tableData.reduce((channel, item) => {
      const estKey = item['Channel Category'];
      // eslint-disable-next-line no-param-reassign
      (channel[estKey] ? channel[estKey] : (channel[estKey] = null || [])).push(item);
      return channel;
    }, {});

    
    return Object.keys(keys).map((key, idx) => {
      return keys[key].map((obj, idx2) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={idx}>
            <RenderRow
              // eslint-disable-next-line react/no-array-index-key
              key={idx2}
              idx={idx2}
              data={obj}
              keys={key}
              rows={keys[key].length}
            />
          </tr>
        );
      });
    });
  };
  
  setTableData = (recvTableData) => {
    var tempTableData = [];
    var allIdx = 0;
    this.setState(
        {tableData : [],}
      );
    recvTableData.Data.forEach(function(item,idx){
      allIdx += 1 ;
      tempTableData.push({ 'Channel Category': item.Channel_Category === "NULL" ? "-" : item.Channel_Category , Channel: item.Channel === "NULL" ? "-" : item.Channel , 'Post(product)' : item.Post_Product === "NULL" ? "-" : item.Post_Product , "Comment(Review)": item.Comment_Review === "NULL" ? "-" : item.Comment_Review , "View": item.View === "NULL" ? "-" : item.View , 'List(Cart)': item.Like_Cart === "NULL" ? "-" : item.Like_Cart , 'Press': item.Press === "NULL" ? "-" : item.Press , 'Positive Rate': item.Positive_Rate === "NULL" ? "-" : item.Positive_Rate , 'Negative Rate': item.Negative_Rate === "NULL" ? "-" : item.Negative_Rate});
    });
    // console.log('ChannelTable setTableData ' , tempTableData);
    this.setState(
      {tableData : tempTableData,}
    );
  }

  getTableData = () => {

    axios.post("/prime/GetChannel_Posting_Indicator",this.props.searchCondition)
      .then((response) => {
          if (response.data.ErrorCode === 'OK'){    
            this.setTableData(response.data);
          }
          else{
            console.log('prime GetChannel_Posting_Indicator error');
          }
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }


  
  render() {
    return (
      <div>
        <div>
          <table className='r-table table tbl-indicator mt-5'>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>{this.getRowsData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ChannelTable;
