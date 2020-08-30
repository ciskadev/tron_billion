import React, { Component } from 'react'
import Top from "./TopPage";

class Param extends Component {
    render() {
        console.log('PAram ' + this.props.match.params.id);
        return (
            <div>
                <Top
                    refLinkid={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default Param
