import React, { Component } from 'react'
import back from "./img/back4.jpg"
import back1 from "./img/back.jpg"
import { toast } from 'react-toastify';
import loader from "./img/loadicon1.gif"

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
            fontSize: "30px", color: "orange", textAlign: "center", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold", fontWeight: "bold"
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
            transition: ".4s", marginTop: "10px", marginLeft: "10px", marginBottom: "10px", fontWeight: "3px", border: "2px solid white", backgroundColor: "black"

        }

        const investButton = {
            display: "inline - block",
            padding: "0.5em 1em",
            textDecoration: "none",
            color: "#FFF",
            transition: ".4s", marginTop: "20px", marginLeft: "10px", marginBottom: "20px", fontWeight: "3px", fontFamily: "MyFont", textAlign: "right", border: "2px solid white", backgroundColor: "green"
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6" style={colStyle}>

                        <h2 style={h2Style}>Invest</h2>


                        <div className="col-xl-12" style={{ textAlign: "center" }}>
                            <form
                                onSubmit={(event) => {

                                    event.preventDefault();
                                    const refid = this.props.refid;
                                    const amount = this.state.count;

                                    if (amount >= 100 && this.props.depositCount == 0) {
                                        this.props.invest(refid, amount);

                                    } else if (amount >= 100 && this.props.depositCount > 0) {
                                        this.props.reinvest(amount);

                                    } else {
                                        toast.error("Min deposit is 100 TRX");
                                    }


                                }}

                            >
                                <input type="text" style={{ backgroundColor: "#000", borderRadius: "10px", height: "50px", opacity: "80%", color: "White", fontSize: "25px", paddingLeft: "30px", border: "2px solid white" }} value={this.state.count} />


                                <a className="btn btn-primary" style={addButton} onClick={this.button100}>+100</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.button1000}>+1000</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.button10k}>+10 k</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.button50k}>+50 k</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.button100k}>+100 k</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.button500k}>+500 k</a>
                                <a className="btn btn-primary" style={addButton} onClick={this.reset}>Reset</a><br />


                                {this.props.refLoading ? <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "20px" }} /> :
                                    <button type="submit" className="btn btn-success" style={investButton}>Top up</button>}
                                }

                            </form>


                        </div>
                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default Invest
