import React, { useState } from 'react';
import axios from 'axios';

function Data(props) {
    const [result, setResult] = useState();

    const callApi = (urlText) => {
        axios({
            method: "get",
            url: urlText,
            responseType: "type",
            params : { 
                he : '으정바보'
            }
        }).then(({ data }) => {
            setResult(JSON.stringify(data));
        }).catch(function(error) {
            alert("오류");
        });
    }

    return (
        <>
            <div>{result}</div>
            <div><button onClick={() => { callApi('/getIndustry/EFactor_GI') }}>EFactor_GI</button></div>
            <div><button onClick={() => { callApi('/getIndustry/EFactor_TrendAndFactor') }}>EFactor_TrendAndFactor</button></div>
            <div><button onClick={() => { callApi('/getIndustry/EFactor_TrendQuad') }}>EFactor_TrendQuad</button></div>
            <div><button onClick={() => { callApi('/getIndustry/PFactor_GI') }}>PFactor_GI</button></div>
            <div><button onClick={() => { callApi('/getIndustry/PFactor_TrendAndFactor') }}>PFactor_TrendAndFactor</button></div>
            <div><button onClick={() => { callApi('/getIndustry/PFactor_TrendQuad') }}>PFactor_TrendQuad</button></div>
            <div><button onClick={() => { callApi('/getIndustry/Showroom') }}>Showroom</button></div>
            <div><button onClick={() => { callApi('/getIndustry/TotalCategory_List') }}>TotalCategory_List</button></div>
            <div><button onClick={() => { callApi('/auth/Login')} }>Login</button></div>
        </>
    );
}

export default Data;