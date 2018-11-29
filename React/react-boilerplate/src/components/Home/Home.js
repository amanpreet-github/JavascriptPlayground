import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    async handleButtonClick(e) {
        this.props.onFetchHomeDetail();
    }

    render() {
        return (
            <div>
                <h1>
                    {`Hello. You are from ${this.props.pinCode}`}
                </h1>
                <button onClick={this.handleButtonClick}>
                    Click Me
                </button>
            </div>
        );
    }
}

Home.propTypes = {
    pinCode: PropTypes.number
}

export default Home;