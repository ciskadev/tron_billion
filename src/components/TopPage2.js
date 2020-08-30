import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./img/brick.jpg"
import back1 from "./img/back.jpg"
import TronWeb from 'tronweb';
import Utils from 'utils';
//import Home from "./Home";
import Invest from "./Invest";
import View from "./View";
import SmartInfo from "./SmartInfo";
import MyStats from "./MyStats";
import ReferStatsBiz from "./ReferStatsBiz";
import ShareStats from "./ShareStats";
import Timer from "./Timer";

import ChangeAdmin from "./ChangeAdmin";
import Footer from "./Footer";
import Param from "./Param";

import 'react-toastify/dist/ReactToastify.css';

import "./css/font-awesome-all.css";
import "./css/flaticon.css";
import "./css/bootstrap.css";
import "./css/jquery.fancybox.min.css";
import "./css/animate.css";
import "./css/imagebg.css";
import "./css/style.css";
import "./css/responsive.css";

// let url = "https://tronbillion.io/";
let url = "https://tronbillion.io/";

const FOUNDATION_ADDRESS = 'TYDWj2DBbKMdnzmUgZZrujSxkwuy522fCZ';
const MANAGER = "TY1ntyZuEwQReFjm9ggpY3Qa2uE4tHMjPf";

let tronContracturl = "https://tronscan.org/#/contract/" + FOUNDATION_ADDRESS;
let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();


class TopPage extends Component {

    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();

    }

    connectTronWeb = async () => {
        await new Promise(resolve => {
            const tronWebState = {
                installed: window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
                base58: FOUNDATION_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if (this.state.tronWeb.loggedIn)
                    window.location.reload();
                return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb);

        // this.startEventListener();
        //   this.fetchMessages();

    }

    loadBlockChainData = async () => {
        //  this.setState({ loading: false });

        // Global Stats
        const sunny = 1000000;

        toast.info("We highly recommend you to use Token Pocket for Smooth operation");

        await Utils.contract.checkOwner().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        });

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });
            console.log(this.state.refid);
            let refUser = await Utils.contract.playersBiz(this.state.refid).call();
            console.log(refUser);

            let refTotalInvestment = parseInt(refUser.myTotalInvestment.toString()) / sunny;
            console.log(refTotalInvestment);
            if (refTotalInvestment >= 10) {
                this.setState({ refid: this.props.refLinkid });
            }
            else {
                this.setState({ refid: this.state.owner });
            }

        } else {
            this.setState({ refid: this.state.owner });
        }

        console.log("refid " + this.state.refid);

        this.setState({ refLoading: false });

        const ManagerHex = window.tronWeb.address.toHex(MANAGER);
        console.log('investor address ' + ManagerHex);
        this.setState({ ManagerHex });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        // this.setState({ account: this.state.refid });
        this.setState({ walletload: false });


        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });


        const totalInvested = await Utils.contract.totalInvested().call();
        this.setState({ totalInvested: parseInt(totalInvested.toString()) / sunny });

        const contractBalance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contractBalance: contractBalance / sunny });

        const totalPayout = 0.9 * this.state.totalInvested - this.state.contractBalance;
        this.setState({ totalPayout: Number(totalPayout).toFixed(4) });

        const totalPlayers = await Utils.contract.totalPlayers().call();
        this.setState({ totalPlayers: parseInt(totalPlayers.toString()) });

        const totalDepositCount = await Utils.contract.totalDepositCount().call();
        this.setState({ totalDepositCount: parseInt(totalDepositCount.toString()) });

        let ref1biz = 0;
        let biz1 = 0;

        let ref2biz = 0;
        let biz2 = 0;
        //level 1
        console.log(totalDepositCount);
        for (let y1 = 1; y1 <= this.state.totalDepositCount; y1++) {
            let deposit1 = await Utils.contract.deposits(y1).call();
            let depAddr1 = deposit1.depAddress;
            let user1biz = await Utils.contract.playersBiz(depAddr1).call();
            let user1 = await Utils.contract.players(depAddr1).call();
            //     console.log(user1.refFrom);
            let refer1 = user1.refFrom;

            this.setState({ refer1: window.tronWeb.address.fromHex(refer1) });
            //  console.log(this.state.refer);

            if (this.state.refer1 === this.state.account) {
                let biz1 = user1biz.myTotalInvestment;
                this.setState({ biz1: parseInt(biz1.toString()) / sunny });
                //    console.log(this.state.biz1)

                ref1biz += this.state.biz1;


                // for (let y2 = 1; y2 <= this.state.totalDepositCount; y2++) {
                //     let deposit2 = await Utils.contract.deposits(y2).call();
                //     let depAddr2 = deposit2.depAddress;
                //     let user2biz = await Utils.contract.playersBiz(depAddr2).call();
                //     let user2 = await Utils.contract.players(depAddr2).call();
                //     //     console.log(user2.refFrom);
                //     let refer2 = user2.refFrom;

                //     this.setState({ refer2: window.tronWeb.address.fromHex(refer2) });
                //     //  console.log(this.state.refer);

                //     if (this.state.refer2 === this.state.refer1) {
                //         let biz2 = user2biz.myTotalInvestment;
                //         this.setState({ biz2: parseInt(biz2.toString()) / sunny });
                //         // console.log(this.state.biz2)

                //         ref2biz += this.state.biz2;



                //         // level 2


                //     }
                // }
            }
        }

        this.setState({ ref1biz });
        //  console.log('Last ref ' + this.state.refid);
        this.setState({ loading: false });

    }


    constructor(props) {
        super(props)

        this.state = {

            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestmentLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            lastDepositTime: 0,
            depositCount: 0,

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
            ref1sum: 0,
            ref2sum: 0,
            ref3sum: 0,
            ref4sum: 0,
            ref5sum: 0,
            ref6sum: 0,
            ref7sum: 0,
            ref8sum: 0,
            ref9sum: 0,
            ref10sum: 0,
            ref11sum: 0,
            ref12sum: 0,
            ref13sum: 0,
            ref14sum: 0,
            ref15sum: 0,
            ref17sum: 0,
            ref18sum: 0,
            ref19sum: 0,
            ref20sum: 0,

            ref1biz: 0,
            ref2biz: 0,
            ref3biz: 0,
            ref4biz: 0,
            ref5biz: 0,
            ref6biz: 0,
            ref7biz: 0,
            ref8biz: 0,
            ref9biz: 0,
            ref10biz: 0,
            ref11biz: 0,
            ref12biz: 0,
            ref13biz: 0,
            ref14biz: 0,
            ref15biz: 0,
            ref17biz: 0,
            ref18biz: 0,
            ref19biz: 0,
            ref20biz: 0,

            refRewards: 0,
            payRewards: 0,
            roiUnclaimed: 0,
            roiClaimed: 0,
            myTotalInvestment: 0,
            totalRefSum: 0,
            totalRefBiz: 0,
            maxRec1: 0,
            payoutSum: 0,
            contractBalance: 0,
            totalPayout: 0,
        }

    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", overflow: "hidden",
        };
        const colStyle = {
            backgroundColor: "none", opacity: "80%", backgroundImage: `url(${back1})`, marginTop: "20px", borderRadius: "20px", border: "5px solid white", marginLeft: "20px", marginRight: "20px",
        };
        const h2Style = {
            fontSize: "30px", color: "white", textAlign: "center", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }
        const h3Style = {
            fontSize: "15px", color: "orange", textAlign: "left", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }

        const h4Style = {
            fontSize: "15px", color: "orange", textAlign: "right", fontFamily: "MyFont", margin: "20px", paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold"
        }
        return (
            <div>
                <div>
                    <p></p>
                </div>
                <div style={backStyle}>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <a href={url} >  <img src={require("./img/logo2.png")} alt="Logo" width="400px" /></a>
                    </div>

                    <ReferStatsBiz

                        refbiz1={this.state.ref1biz}


                    />

                    {this.state.myTotalInvestment >= 100 ?
                        <View /> : null

                    }

                </div>

            </div >
        );
    }
}
export default TopPage;
