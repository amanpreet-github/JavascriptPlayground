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
            React.createElement(‘ul’, { className : ‘list’ },
  React.createElement(‘li’, {}, ‘item 1’),
  React.createElement(‘li’, {}, ‘item 2’),
);
            </div>
        );
    }
}

Home.propTypes = {
    pinCode: PropTypes.number
}

export default Home;