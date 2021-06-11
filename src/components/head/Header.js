import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items : []
        ,   types : ['line', 'bar']
        }
    }

    componentDidMount = () => {
        this.callApi();
    }

    callApi = async () => {
        const response = await fetch('/api/customerChart', { 
            method : "POST"
        ,   headers : {
                'Content-type' : 'application/json'
            }
        });
        const body = await response.json();

        this.makeData(body);
    }

    makeData = (item) => {
        const arr = item.reduce((acc, cur) => {
        const findItem = acc.find(a => a.ID === cur.ID && a.JOB === cur.JOB && a.COUNT === cur.COUNT);

        if(!findItem) {
            acc.push({
                ID : cur.ID
            ,   JOB : cur.JOB
            ,   COUNT : cur.COUNT
            });
        }
        if(findItem && findItem.COUNT !== cur.COUNT) {
            findItem.ID = cur.ID;
            findItem.JOB = cur.JOB;
            findItem.COUNT = cur.COUNT;
        }
        
        return acc;
        }, [])

        let items = arr.map(c => `${c.JOB}`);

        this.setState({
            items : items
        })
    }

    radioChange = (e) => {
        var checkList = [];

        const query = 'input[name="category"]:checked';
        const selected = document.querySelectorAll(query);
        selected.forEach(function(i) {
            checkList.push(i.value);
        })

        this.props.call(checkList);
    }

    render() {
        return (
            <>  
                <div>
                {
                    this.state.items ? this.state.items.map((contact, i) => {
                        return (
                            <label><input type='checkbox' name='category' value={contact} />{contact}</label>
                        );
                    }) : ""
                }
                </div>
                <div>
                {
                    this.state.types ? this.state.types.map((contact, i) => {
                        let result;

                        if({i}.i === 0) {
                            result = <label><input type='radio' name='type' value={contact} onChange={this.radioChange} defaultChecked />{contact}</label>;
                        }
                        else {
                            result = <label><input type='radio' name='type' value={contact} onChange={this.radioChange} />{contact}</label>;
                        }

                        return result;
                    }) : ""
                }
                </div>
            </>
        );
    }
}

export default Header;