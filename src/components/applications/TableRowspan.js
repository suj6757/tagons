/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-new-object */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { Component} from 'react';
import RowTable from './Row';

class TableRowspan extends Component {
  constructor(props, context) { 
    super(props, context);
    const myProps=this.getDataModelled();
    const propsToPass=this.getDataWithSpanCount(myProps);
    this.state={
      tableNewData:propsToPass
    }
  }

getDataModelled(){
    const data = this.props.tData;
    const newRowData=[];
    for(let i=0;i<data.length;i++){
      const obj = data[i];
      const newColData=[];
        for (const item in obj){
          newColData.push(new Object({
            key:item,
            value:obj[item],
            rowspan:1,
            print:true
          }));
        };
         newRowData.push(newColData);
    };
    return newRowData;
  }
  getDataWithSpanCount(myProps){
    for(let i=1;i<myProps.length;i++)
    {
      for(let j=0;j<myProps[i].length;j++)
      {
        for(let k= i-1; k>=0 && myProps[i][j].value === myProps[k][j].value;k--){
          switch (myProps[k][j].key) {
            case'post' :
              myProps[k][j].print = true;
              break;
            case 'comment' :
              myProps[k][j].print = true;
              break;
            case 'view' :
              myProps[k][j].print = true;
              break;
            case 'like' :
              myProps[k][j].print = true;
              break;
            case 'press' :
              myProps[k][j].print = true;
              break;
            case 'positiveRate' :
              myProps[k][j].print = true;
              break;
            case 'negativeRate' :
              myProps[k][j].print = true;
              break;
            default: 
              myProps[k][j].rowspan = myProps[k][j].rowspan + 1;
              myProps[k+1][j].print = false;
              break;
          }
        }
    }
  }
  return myProps;
}
  render() {
    const stateItem = this.state;
    const propsItem = this.props;
    console.log(propsItem);
    return (
      <table className={propsItem.tClass}>
          <thead className='ar-table-thead'>
          <tr className='ar-table-thead-row'>{propsItem.tColumns.map((tColumn, idx)=>
          <th className='ar-table-thead-header' key={idx}>{tColumn.header}</th>
          )}
          </tr>
          </thead>
          <tbody>
          {stateItem.tableNewData.map((rData, idx) =>
            <RowTable rData={rData} key={idx}/>
          )}
          </tbody>
      </table>
    );
  }
}

export default TableRowspan;