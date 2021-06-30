/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React , { useState , useEffect} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import { getGiBubble } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import DatatablePagination from '../../components/DatatablePagination';

// import products from '../../data/products';

function Table({ columns, data, divided = false, defaultPageSize = 5 }) {
  
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  title='클릭시 정렬'
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'text-center sorted-desc'
                        : 'text-center sorted-asc'
                      : ' text-center'
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => console.log(row.original)}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'Rank',
        cellClass: 'list-item-heading text-center',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Purchase Factor',
        accessor: 'PurchaseFactor',
        cellClass: 'list-item-heading text-muted text-center',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Satisfaction Factor',
        accessor: 'SatisfactionFactor',
        cellClass: 'list-item-heading text-muted text-center',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Dis-satisfaction Factor',
        accessor: 'DisSatisfactionFactor',
        cellClass: 'list-item-heading text-muted text-center',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);

  const [products , setProducts] = useState([]);

  const callGIApi = async (paramValue,callUrl) =>{ 
    await axios.post(callUrl,paramValue)
      .then(function (response) { 
        // setEFactorGI(JSON.stringify(response) );
        /* 여기에서 데이타 갱신 함수 콜 */ // 여기가 로그인 확인
        setProducts(response.data.TableData); //getGiBubble
        dispatch(getGiBubble(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const replaceAll = (str,p1,p2) => {
    return str.split(p1).join(p2);
  }
  useEffect(() => {
    var param1 = {};
    var callUrl = "";
    if (!(store.SearchCondition.Category1 === "" || store.SearchCondition.Category1 === null || store.SearchCondition.Category1 === undefined)){
        param1.FromDate = replaceAll(store.SearchCondition.FromDate,"-","");
        param1.ToDate = replaceAll(store.SearchCondition.ToDate,"-","");
        param1.Category1 = store.SearchCondition.Category1;
        param1.Category2 = store.SearchCondition.Category2;
        param1.Category3 = store.SearchCondition.Category3;
        param1.Keyword = store.SearchCondition.Keyword;
        if (store.SearchCondition.activeFirstTab === "1") {
          callUrl = "/api/GetIndustry_PFactor_GI";
        }
        else{
          callUrl = "/api/GetIndustry_EFactor_GI";
        }
        callGIApi(param1,callUrl);
      }
    
  },[store]);
  return (
    <Card className="mb-4">
      <CardBody>
        {/* <CardTitle>
          <IntlMessages id="table.react-pagination" />
        </CardTitle> */}
        <Table columns={cols} data={products} />
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  const [products , setProducts] = useState([]);
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.divided" />
      </CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};