import React, { Component } from 'react'
import back from "./img/back4.jpg"
import back1 from "./img/back.jpg"
import loader from "./img/loadicon1.gif"

let url = "https://tronbillion.io/refer/";

export class ShareStats extends Component {

    constructor(props) {
        super(props);

        this.state = { copySuccess: '' }
    }

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };

    render() {

        const colStyle = {
            backgroundColor: "black", opacity: "60%", marginTop: "20px", borderRadius: "20px", border: "5px solid white", marginLeft: "20px", marginRight: "20px",
        };
        const h2Style = {
            fontSize: "30px", color: "orange", textAlign: "center", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }
        const h3Style = {
            fontSize: "15px", color: "orange", textAlign: "left", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }

        const h4Style = {
            fontSize: "15px", color: "orange", textAlign: "right", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }

        const addButton = {
            display: "inline - block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            backgroundImage: "-webkit - linear - gradient(#6795fd 0 %, #67ceff 100 %)",
            backgroundImage: "linear - gradient(#1f4037 0 %, #99f2c8 100 %)",
            transition: ".4s", marginTop: "10px", marginLeft: "10px", marginBottom: "10px", fontWeight: "3px"
        }

        const investButton = {
            display: "inline - block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            backgroundImage: "-webkit - linear - gradient(#6795fd 0 %, #67ceff 100 %)",
            backgroundImage: "linear - gradient(#eee 0 %, #fff 100 %)",
            transition: ".4s", marginTop: "20px", marginLeft: "10px", marginBottom: "20px", fontWeight: "3px", fontFamily: "MyFont", textAlign: "right"
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>
                        <h2 style={h2Style}>Organization</h2>
                        <p style={{ color: "white", float: "left" }}>Invitation Link </p><p style={{ color: "white", float: "right" }}> <form style={{ textAlign: "center" }}>
                            {this.props.totalInvestmentLoad ?
                                <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "20px" }} />
                                :
                                <input style={{ textAlign: "center" }}
                                    ref={(textarea) => this.textArea = textarea}
                                    value={url + this.props.account} style={{ backgroundColor: "black", color: "white" }}
                                />
                            }




                        </form>
                            {
                                document.queryCommandSupported('copy') &&
                                <p style={{ float: "right" }} >
                                    <button className="btn btn-success" onClick={this.copyToClipboard}>Copy</button>
                                    {this.state.copySuccess}
                                </p>
                            }</p><br /><br /><br />
                        <p style={{ color: "white", float: "left" }}>Personal Invited Partners </p><p style={{ color: "white", float: "right" }}> {this.props.refsum1}</p><br /><br />

                        <p style={{ color: "white", float: "left" }}>Total Community Participants </p><p style={{ color: "white", float: "right" }}> {this.props.total_users}</p><br /><br />

                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default ShareStats
