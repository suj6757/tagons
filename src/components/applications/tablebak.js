/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";

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
      tableData: [
        // eslint-disable-next-line no-dupe-keys
        { 'Channel Category': "Search Volume", Channel: "Naver", 'Post(product)' : 447, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70},
        { 'Channel Category': "Social", Channel: "Naver News", 'Post(product)' : 1275, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70},
        { 'Channel Category': "Social", Channel: "Naver Blog", 'Post(product)' : 1275, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Instargram", 'Post(product)' : 1138, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Facebook", 'Post(product)' : 1198, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Social", Channel: "Youtube", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "Shopping", Channel: "Navete shopping", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
        { 'Channel Category': "E-Commerce", Channel: "Coupang", 'Post(product)' : 1258, "Comment(Review)": '-', "View": '-', 'List(Cart)': 50, 'Press': 4965, 'Positive Rate': 11111, 'Negative Rate': 70 },
      ]
    };
  }

  getKeys = () => {
    const { tableData } = this.state;
    return Object.keys(tableData[0]);
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
