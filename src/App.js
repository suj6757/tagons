import React from 'react';
import Routes from './Routes';
import Login from './components/body/Login';

function App() {
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');

    const idCallBack = (res) => {
        console.log(res.ID);
        console.log(res.PW);

        setId(id => res.ID);
        setPw(pw => res.PW);

        console.log(id);
        console.log(pw);
    };

    if(window.sessionStorage.getItem("ID") == null) {
        return <Login callBack={idCallBack} />;
    }
    else {
        return <Routes />;
    }
}

export default App;