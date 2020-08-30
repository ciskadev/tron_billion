import React, { Component } from 'react'
import Top3 from "./TopPage3";

class Param2 extends Component {
    render() {
        console.log('param2 ' + this.props);
        return (
            <div>
                <Top3
                    viewID={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default Param2
