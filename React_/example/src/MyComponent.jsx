import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class MyComponent extends PureComponent {
    render() {
        const {
            boolValue,
            arrayValue,
            objValue,
            nodeValue,
            funcValue
        } = this.props;
        return (
        <div>
            {String(Object.entries(objValue))}
        </div>
        )
    }
}

MyComponent.propTypes = {
    arrayValue: PropTypes.arrayOf(PropTypes.number),
    objValue: PropTypes.shape({
        name: PropTypes.string,
        age:PropTypes.number
    }),
    nodeValue: PropTypes.node,
    funcValue: PropTypes.func
}
export default MyComponent;