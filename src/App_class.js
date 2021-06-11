import React from 'react';
import Routes from './Routes';
import Login from './components/body/Login';
class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id : ''
        }
    }

    callBack = (data) => {
        this.setState({
            id : data
        });
    }

    render() {
        if(window.sessionStorage.getItem("ID") == null) {
            return <Login callBack={this.callBack} />;
        }
        else {
            return <Routes />;
        }
    }
}

export default App;