import React, { Component } from 'react'
import back from "./img/back4.jpg"
import back1 from "./img/back.jpg"
import Timer from "./Timer"
import loader from "./img/loadicon1.gif"

export class Invest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }

        this.button100 = this.button100.bind(this);
        this.button1000 = this.button1000.bind(this);
        this.button10k = this.button10k.bind(this);
        this.button50k = this.button50k.bind(this);
        this.button100k = this.button100k.bind(this);
        this.button500k = this.button500k.bind(this);
        this.reset = this.reset.bind(this);
        this.setSeconds = this.setSeconds.bind(this);
        this.setSeconds();
    }
    setSeconds() {
        this.setState({ seconds: this.props.seconds });

    }

    button100(event) {
        this.setState({ count: this.state.count + 100 });
    }

    button1000(event) {
        this.setState({ count: this.state.count + 1000 });
    }

    button10k(event) {
        this.setState({ count: this.state.count + 10000 });
    }

    button50k(event) {
        this.setState({ count: this.state.count + 50000 });
    }

    button100k(event) {
        this.setState({ count: this.state.count + 100000 });
    }

    button500k(event) {
        this.setState({ count: this.state.count + 500000 });
    }

    reset(event) {
        this.setState({ count: 0 });
    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
        };
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
            transition: ".4s", marginTop: "20px", marginLeft: "10px", marginBottom: "20px", fontWeight: "3px", fontFamily: "MyFont", textAlign: "right", border: "2px solid white", backgroundColor: "#5B2C6F",
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>
                        <h2 style={h2Style}>My Statistics</h2>
                        <div className="col-xl-12" style={{ textAlign: "center" }}>

                            <p style={{ color: "white", float: "left" }}>Status</p><p style={{ color: "white", float: "right" }}> {this.props.userStatus}</p><br /><br />

                            <p style={{ color: "white", float: "left" }}>My Address </p>
                            {this.state.walletLoad ?
                                <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "20px" }} />
                                : <p style={{ color: "white", float: "right" }}>

                                    {this.props.my_address}...</p>}
                            <br /><br />
                            <p style={{ color: "white", float: "left" }}>Total Invested </p><p style={{ color: "white", float: "right" }}> {this.props.total_deposits} TRX</p><br /><br />
                            <p style={{ color: "white", float: "left" }}>Referred By</p><p style={{ color: "white", float: "right" }}> {this.props.upline}...</p><br /><br />

                            <p style={{ color: "white", float: "left" }}>350% Limit Remaining </p><p style={{ color: "white", float: "right" }}> {Number(this.props.limit_remaining).toFixed(4)} TRX</p><br /><br />
                            <p style={{ color: "white", float: "left" }}>1.4% ROI Received</p>
                            <p style={{ color: "white", float: "right" }}> {Number(this.props.roiClaimed).toFixed(4)} TRX</p><br /><br />

                            <p style={{ color: "white", float: "left" }}>Direct Commissions </p><p style={{ color: "white", float: "right" }}> {Number(this.props.direct_bonus).toFixed(4)} TRX</p><br /><br />
                            <p style={{ color: "white", float: "left" }}>Generation Commissions </p><p style={{ color: "white", float: "right" }}> {Number(this.props.gen_bonus).toFixed(4)} TRX</p><br /><br />
                            <p style={{ color: "white", float: "left" }}>Total TRX Received </p><p style={{ color: "white", float: "right" }}> {Number(this.props.payouts).toFixed(4)} TRX</p><br /><br />
                            <p style={{ color: "white", float: "left" }}>Withdrawable </p><p style={{ color: "white", float: "right" }}>

                                {this.props.roiLoading ? <span>calculating...  </span> :
                                    Number(this.props.roiUnclaimed.toFixed(4))}
                                <span style={{ paddingLeft: "5px" }}>TRX</span></p><br /><br />

                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    this.props.withdraw();
                                }}
                            >
                                <button className="btn btn-primary" type="submit" style={investButton} onClick={this.reset}>Withdraw</button>
                            </form>


                            <p>~2 TRX or more Fees needed</p><br />
                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default Invest
