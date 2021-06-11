import React from 'react';
import { Link } from 'react-router-dom';
class Locate extends React.Component {
    render() {
        return (
            <div className='black-nav'>
                <Link to='/'>Main</Link>
                <Link to='/add'>Add</Link>
                <Link to='/test'>Test</Link>
                <Link to='/data'>Data</Link>
            </div>
        );
    }
}

export default Locate;