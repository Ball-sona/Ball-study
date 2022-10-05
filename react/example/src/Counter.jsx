import React, { PureComponent } from 'react'

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count:props.count
        }
        this.increase = this.increase.bind(this);
    }

    increase() {
        const {number} = this.state;
        this.setState( ({count}) => {
            count : count +1
        })
    }
    render() {
        return (
            <div>
                <div> 현재 : {this.state.count} </div>
                <button onClick={this.increase}>증가</button>
            </div>            
        )
    }
}

export default Counter