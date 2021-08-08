/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint no-undef: "off" */
/* eslint no-unused-vars: "off" */
/* eslint-disable react/no-this-in-sfc */
/* eslint no-else-return: "off" */
import React from "react";
import {Table} from 'reactstrap';
import { useTable } from "react-table";

// eslint-disable-next-line import/prefer-default-export
export const  ReactTableNor = ({columns,data}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  const handleClick = evt => {
    // 클릭 데이터 넘김
    console.dir(evt);
  }


  // Render the UI for your table
  return (
    <Table {...getTableProps()} className='tbl_basic'>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()} onClick={() => handleClick(cell)} onKeyDown={() => handleClick(cell)}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
