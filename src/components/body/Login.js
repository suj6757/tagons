import React from 'react';

function Login(props) {
    const [id, setId] = React.useState();
    const [pw, setPw] = React.useState();

    const saveId = () => {
        window.sessionStorage.setItem("ID", id);
        
        props.callBack({
            ID : id,
            PW : pw
        });
    }

    return (
        <>
            <div>ID : <input type='text' name="cmbId" onChange={({target : { value }}) => setId(value)} /></div>
            <div>PW : <input type='password' name="cmbPw" onChange={({target : { value }}) => setPw(value)} /></div>
            <div><button type="button" onClick={saveId}>로그인</button></div>
        </>
    );
}

export default Login;