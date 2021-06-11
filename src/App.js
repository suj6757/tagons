import React, { useState } from 'react';
import Routes from './Routes';
import Login from './components/body/Login';

import './App.css';

function App() {
  const [id, setId] = useState();

  const idCallBack = id => {
    setId(id);
  };


  if(window.sessionStorage.getItem("ID") == null) {
    return <Login callBack={idCallBack} />;
  }
  else {
    return <Routes />;
  }
}

export default App;
