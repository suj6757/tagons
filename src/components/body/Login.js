import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id : ''
        ,   pw : ''
        ,   resData : []
        }
    }
 
    saveId = () => {
        window.sessionStorage.setItem("ID", this.state.id);
        this.props.callBack(this.state.id);
    }
    
    render() {
        return (
            <>
                <div>ID : <input type='text' name="id" value={this.state.id} onChange={({target : { value }}) => this.setState({ id : value })} /></div>
                <div>PW : <input type='password' name="pw" value={this.state.pw} onChange={({target : { value }}) => this.setState({ pw : value })} /></div>
                <div><button type="button" onClick={this.saveId}>로그인</button></div>
            </>
        );
    }
}

export default Login;