import React, { Component } from 'react';
import NumberRangeSelector from '../../components/NumberRangeSelector/NumberRangeSelector';

class Public extends Component {
    render() {
        return <div>
            <h1>Number Range Selector</h1>
            <NumberRangeSelector range={[10000, 150000]}/>
        </div>;
    }
}

export default Public;