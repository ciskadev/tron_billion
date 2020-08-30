import React, { Component } from 'react'
import back from "./img/back4.jpg"
import back1 from "./img/back.jpg"

export class ReferStats extends Component {


    constructor(props) {
        super(props)

        this.state = {
            count: 0,

        }


    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
        };
        const colStyle = {
            backgroundColor: "black", opacity: "70%", marginTop: "20px", borderRadius: "20px", border: "5px solid white", marginLeft: "20px", marginRight: "20px",
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
                        <h2 style={h2Style}>Team Statistics</h2>
                        <p style={{ color: "white", float: "left" }}>Tier 1 (Count : {this.props.refsum1})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz1} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 2 (Count : {this.props.refsum2})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz2} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 3 (Count : {this.props.refsum3})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz3} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 4 (Count : {this.props.refsum4})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz4} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 5 (Count : {this.props.refsum5})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz5} TRX</p><br /><br />

                        <p style={{ color: "white", float: "left" }}>Tier 6 (Count : {this.props.refsum6})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz6} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 7 (Count : {this.props.refsum7})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz7} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 8 (Count : {this.props.refsum8})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz8} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 9 (Count : {this.props.refsum9})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz9} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 10 (Count : {this.props.refsum10})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz10} TRX</p><br /><br />


                        <p style={{ color: "white", float: "left" }}>Tier 11 (Count : {this.props.refsum11})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz11} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 12 (Count : {this.props.refsum12})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz12} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 13 (Count : {this.props.refsum13})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz13} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 14 (Count : {this.props.refsum14})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz14} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 15 (Count : {this.props.refsum15})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz15} TRX</p><br /><br />

                        <p style={{ color: "white", float: "left" }}>Tier 16 (Count : {this.props.refsum16})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz16} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 17 (Count : {this.props.refsum17})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz17} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 18 (Count : {this.props.refsum18})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz18} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 19 (Count : {this.props.refsum19})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz19} TRX</p><br /><br />
                        <p style={{ color: "white", float: "left" }}>Tier 20 (Count : {this.props.refsum20})</p><p style={{ color: "white", float: "right" }}> Biz : {this.props.refbiz20} TRX</p><br /><br />

                        <p style={{ color: "orange", float: "left" }}>Total (Count : {this.props.totalRefSum})</p><p style={{ color: "orange", float: "right" }}> Biz : {this.props.totalRefBiz} TRX</p><br /><br />



                    </div>
                    <div className="col-xl-3"></div>
                </div>

            </div>
        )
    }
}

export default ReferStats
