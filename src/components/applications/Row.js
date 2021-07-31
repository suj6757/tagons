/* eslint-disable react/no-array-index-key */

import React from 'react';
import TableColumn from './TableColumn';


const Row=({rData})=>{
    
    return(
      <tr className='ar-table-row'>
      {rData.map((colData, idx)=>
        { 
            return(  
            <TableColumn colData={colData} key={idx} />
        )}
      )}
   </tr>
 );
}

export default Row;