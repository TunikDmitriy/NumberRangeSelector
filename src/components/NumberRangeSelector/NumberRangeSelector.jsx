import React, { Component } from 'react';
import './number-range-selector.css';

export default class NumberRangeSelector extends Component {

    range = [0, 100000];
    sliderElem = undefined;
    thumbElem = undefined;
    railWidth = 0;
    sliderCoords = {left: 0};
    shiftX = 0;

    constructor(props){
        super(props);
        if (props.range) this.range = props.range;
        this.state = {
            position: 0,
            value: this.range[0],
        };
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount() {
        this.sliderElem = document.querySelector('.scale-picker_rail');
        this.thumbElem = document.querySelector('.scale-picker_slider');
        this.railWidth = this.sliderElem.clientWidth;
    }

    handleChange = (e) => {
        let value = +e.target.value;
        if (value > this.range[1]) value = this.range[1];
        if (value < this.range[0]) value = this.range[0];
        this.setState({
            value: value,
            position: (value - this.range[0]) / (this.range[1] - this.range[0]) * 100
        });
    };

    onMouseDown = (e) => {
        let thumbCoords = NumberRangeSelector.getCoords(this.thumbElem);
        this.sliderCoords = NumberRangeSelector.getCoords(this.sliderElem);
        this.shiftX = e.pageX - thumbCoords.left;

        document.onmousemove = this.onMouseMove.bind(null);
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
    };

    onMouseMove = (e) => {
        let position = (e.pageX - this.shiftX - this.sliderCoords.left) / this.railWidth * 100;
        if (position < 0) {
            position = 0;
        }
        if (position > 100) {
            position = 100;
        }
        let value = Math.trunc(this.range[0] + (this.range[1] - this.range[0]) * position / 100);
        this.setState({
            value: value,
            position: position,
        });
    };

    static getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            left: box.left + window.pageXOffset
        };
    }

    render(){
        return <div className="scale-picker">
            <label className="scale-picker_label">Deposit</label>
            <input className="scale-picker_control" type="text" value={this.state.value} onChange={this.handleChange} />
            <div className="scale-picker_addon">₴</div>
            <div className="scale-picker_rail-wrapper">
                <div className="scale-picker_rail">
                    <div className="scale-picker_slider"
                         style={{'left': this.state.position + '%'}}
                         onMouseDown={this.onMouseDown}
                    >
                        <svg className="scale-picker_slider_pointer-curve" width="30" height="24">
                            <g>
                                <line className="scale-picker_slider_svg-line" y2="11.55307" x2="29.98574" y1="11.55307" x1="-0.32798"/>
                                <path className="scale-picker_slider_svg-curve" d="m0.00231,12c5.24403,-0.00633 3.35342,1.85191 6.24759,6.15237c2.89417,4.30046 7.6014,4.49684 8.40635,4.49684c0.80495,0 5.54562,0.11165 8.65336,-4.10927c3.10773,-4.22091 1.79631,-6.47059 6.68808,-6.50294"/>
                            </g>
                        </svg>
                        <svg className="scale-picker_slider_pointer-circle" width="30" height="24">
                            <g>
                                <ellipse className="scale-picker_slider_svg-circle" cx="15" cy="11.5" rx="8.06501" ry="8.06501"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    }
}
