import React, { PureComponent } from 'react'

class StateExample extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            loading:true,
            formData : 'no data'
        };
        this.handleData = this.handleData.bind(this);
        setTimeout(this.handleData,4000);
    }

    handleData() {
        const data = 'new data';
        const {formData} = this.state;
        this.setState({
            loading:false,
            formData: data + formData
        });
        console.log('loading:', this.state.loading);
    }

    render() {
        return (
            <div>
                <span>{String(this.state.loading)}</span>
                <span>{String(this.state.formData)}</span>
            </div>
            
        )
    }
}

export default StateExample