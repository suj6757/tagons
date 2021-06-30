/* eslint-disable react/no-array-index-key */
import React from 'react';
import products from '../../data/products';

const data = products;

const ActiveKeyword = () => {
  return (
    <>
      <div className="active-keyword-area">
        {data.map((item, index) => {
          return (
            <div className="item" key={index}>
              {item.purchase}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActiveKeyword;
