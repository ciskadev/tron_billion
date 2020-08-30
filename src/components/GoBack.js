import React, { Component } from 'react'
let url = "https://tronbillion.io/";

export class GoBack extends Component {
    render() {
        const investButton = {
            display: "inline - block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            transition: ".4s", marginTop: "20px", marginLeft: "50px", marginBottom: "20px", fontWeight: "3px", fontFamily: "MyFont", border: "2px solid white", backgroundColor: "green"
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xl-4">

                    </div>
                    <div className="col-xl-4">
                        <a href={url} style={{ textAlign: "center" }} className="btn btn-success" style={investButton}>Go Back</a>
                    </div>

                    <div className="col-xl-4">

                    </div>
                </div>

            </div>
        )
    }
}

export default GoBack
