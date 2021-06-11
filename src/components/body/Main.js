import React from 'react';
import axios from 'axios';
import Customer from '../struct/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
    root : {
        width : '100%'
    ,   overflowX : 'auto'
    //,   marginTop : theme.spacing.unit * 3
    }
    ,
    table : {
        minWidth : 1000
    }
})

class Main extends React.Component {
    state = {
        customers : ""
    ,   resData : []
    }

    componentDidMount = () => {
        this.callApi();
    }
    
    callApi = async () => {
        await axios({
            method: "get",
            url: "/api/GetIndustry_TotalCategory_List",
            responseType: "type"
        }).then(({ data }) => {
            this.setState({
                resData: data.Data
            });
            
            console.log(this.state.resData);
        }).catch(function (error) {
            // 오류발생시 실행
        });
    }

    /* 
    componentDidMount() {
        this.callApi().then(res => this.setState({ customers : res })).catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();

        return body;
    }
    */
    render() {
        const { classes } = this.props;
    
        return (
            <>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Category1</TableCell>
                                <TableCell align="center">Category2</TableCell>
                                <TableCell align="center">Category3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.resData.length ? this.state.resData.map((data, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="center">{data.Category1}</TableCell>
                                    <TableCell align="center">{data.Category2}</TableCell>
                                    <TableCell align="center">{data.Category3}</TableCell>
                                </TableRow>
                            );
                        }) : 
                            <TableRow>
                                <TableCell align="center" colSpan="3">데이터 로딩중</TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                </Paper>
            </>

            /*
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>아이디</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>나이</TableCell>
                            <TableCell>직업</TableCell>
                            <TableCell>특징</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.customers ? this.state.customers.map(c => {
                                return (
                                    <Customer
                                        key={c.id}
                                        id={c.id}
                                        image={c.image}
                                        name={c.name}
                                        age={c.age}
                                        job={c.job}
                                        remk={c.remk}
                                    />
                                );
                            }) : ""
                        }
                    </TableBody>
                </Table>
            </Paper>
            */
        );
    }
}

export default withStyles(style)(Main);