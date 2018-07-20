import React, { Component } from 'react';

class SearchList extends Component {
    render() {
        return (
            <div>
                Searched texts: {this.props.searchData.join(', ')}
            </div>
        );
    }
}

export default SearchList;