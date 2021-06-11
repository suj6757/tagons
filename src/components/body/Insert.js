import React from 'react';
import { post } from 'axios';

class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null
        ,   fileName : ""
        ,   name : ""
        ,   age : ""
        ,   job : ""
        ,   remk : ""
        }
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.name);
        formData.append('age', this.state.age);
        formData.append('job', this.state.job);
        formData.append('remk', this.state.remk);

        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }

        return post(url, formData, config);
    } 

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((response) => {
            console.log(response.data);
        });
        this.setState({
            file : null
        ,   fileName : ''
        ,   name : ''
        ,   age : ''
        ,   job : ''
        ,   remk : ''
        });

        window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0]
        ,   fileName : e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>고객 추가</h1>
                    <div>프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /></div>
                    <div>이름 : <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /></div>
                    <div>나이 : <input type="number" name="age" value={this.state.age} onChange={this.handleValueChange} /></div>
                    <div>직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /></div>
                    <div>비고 : <input type="text" name="remk" value={this.state.remk} onChange={this.handleValueChange} /></div>
                    
                    <br />
                    <button>추가하기</button>
                </form>
            </div>
        );
    }
}

export default Insert;