import React, {Component} from 'react';


// eslint-disable-next-line react/prefer-stateless-function
class TableColumn extends Component{
  render(){
    const propsItem = this.props;

    if(propsItem.colData.key === 'positiveRate' || propsItem.colData.key === 'negativeRate'){
      if(propsItem.colData.value !== '-'){
        propsItem.colData.value = `${propsItem.colData.value}%`
      }
    }

    const colValue = propsItem.colData.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
    (propsItem.colData.print === true) &&  <td className='ar-table-col' rowSpan={propsItem.colData.rowspan}>{colValue}</td>);
  }
}

export default TableColumn;