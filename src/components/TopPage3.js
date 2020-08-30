import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./img/back4.jpg"
import back1 from "./img/back.jpg"
import TronWeb from 'tronweb';
import Utils from 'utils';
//import Home from "./Home";
import Invest from "./Invest";
import SmartInfo from "./SmartInfo";
import MyStats from "./MyStats";
import ReferStats from "./ReferStats";
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

//let url = "https://tronbillion.io/";
let url = "https://tronbillion.io/";

const FOUNDATION_ADDRESS = 'TUw8QBpqaWXhKDhwRxSKn7UeZuJmHAVhbj';
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
        await Utils.contract.checkOwner().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        });

        if (this.props.viewID) {
            this.setState({ account: this.props.viewID });
        }

        console.log("refid " + this.state.refid);

        this.setState({ refLoading: false });

        const ManagerHex = window.tronWeb.address.toHex(MANAGER);
        console.log(ManagerHex);
        this.setState({ ManagerHex });
        // owner HEx


        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account1: accTemp });
        this.setState({ walletload: false });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });

        const total_site_deposits = await Utils.contract.total_site_deposits().call();
        this.setState({ total_site_deposits: parseInt(total_site_deposits.toString()) / sunny });
        this.setState({ totalInvestLoad: false });

        const contract_balance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contract_balance: contract_balance / sunny });

        const total_users = await Utils.contract.total_users().call();
        this.setState({ total_users: parseInt(total_users.toString()) });

        const total_deposit_count = await Utils.contract.total_deposit_count().call();
        this.setState({ total_deposit_count: parseInt(total_deposit_count.toString()) });

        const dailyRoi = await Utils.contract.dailyRoi().call();
        this.setState({ dailyRoi: parseInt(dailyRoi.toString()) });

        const dailyRateDivisor = await Utils.contract.dailyRate().call();
        this.setState({ dailyRateDivisor: parseInt(dailyRateDivisor.toString()) });

        const total_withdraw = await Utils.contract.total_withdraw().call();
        this.setState({ total_withdraw: parseInt(total_withdraw.toString()) / sunny });

        const min_deposit = await Utils.contract.min_deposit().call();
        this.setState({ min_deposit: parseInt(min_deposit.toString()) / sunny });
        // console.log(this.state.minDepositSize);




        // Personal Stats - players

        let currentuser = await Utils.contract.users(this.state.account).call();

        let deposit_count = currentuser.deposit_count;
        this.setState({
            deposit_count: parseInt(deposit_count.toString()) / sunny
        });

        let isActive = currentuser.isActive;
        this.setState({
            isActive: parseInt(isActive.toString())
        });

        let first_deposit_time = currentuser.first_deposit_time;
        this.setState({
            first_deposit_time: parseInt(first_deposit_time.toString())
        });

        let upline = currentuser.upline;
        this.setState({ upline: window.tronWeb.address.fromHex(upline) });


        let directs = currentuser.directs;
        this.setState({
            directs: parseInt(directs.toString())
        });

        let payouts = currentuser.payouts;
        this.setState({
            payouts: parseInt(payouts.toString()) / sunny
        });

        let direct_bonus = currentuser.direct_bonus;
        this.setState({
            direct_bonus: parseInt(direct_bonus.toString()) / sunny
        });
        let gen_bonus = currentuser.gen_bonus;
        this.setState({
            gen_bonus: parseInt(gen_bonus.toString()) / sunny
        });
        let deposit_payouts = currentuser.deposit_payouts;
        this.setState({
            deposit_payouts: parseInt(deposit_payouts.toString()) / sunny
        });

        let total_deposits = currentuser.total_deposits;
        this.setState({
            total_deposits: parseInt(total_deposits.toString()) / sunny
        });


        let total_structure = currentuser.total_structure;
        this.setState({
            total_structure: parseInt(total_structure.toString()) / sunny
        });

        let gen_rewards_sent = currentuser.gen_rewards_sent;
        this.setState({
            gen_rewards_sent: parseInt(gen_rewards_sent.toString()) / sunny
        });

        if (this.state.isActive) {
            this.setState({ userStatus: "Active" });
        }

        console.log(currentuser);

        let referrals1 = await Utils.contract.referrals1(this.state.account).call();

        let refsum1 = referrals1.refsum1;
        this.setState({
            refsum1: parseInt(refsum1.toString())
        });

        let refsum2 = referrals1.refsum2;
        this.setState({
            refsum2: parseInt(refsum2.toString())
        });
        let refsum3 = referrals1.refsum3;
        this.setState({
            refsum3: parseInt(refsum3.toString())
        });
        let refsum4 = referrals1.refsum4;
        this.setState({
            refsum4: parseInt(refsum4.toString())
        });
        let refsum5 = referrals1.refsum5;
        this.setState({
            refsum5: parseInt(refsum5.toString())
        });
        let refsum6 = referrals1.refsum6;
        this.setState({
            refsum6: parseInt(refsum6.toString())
        });
        let refsum7 = referrals1.refsum7;
        this.setState({
            refsum7: parseInt(refsum7.toString())
        });
        let refsum8 = referrals1.refsum8;
        this.setState({
            refsum8: parseInt(refsum8.toString())
        });
        let refsum9 = referrals1.refsum9;
        this.setState({
            refsum9: parseInt(refsum9.toString())
        });
        let refsum10 = referrals1.refsum10;
        this.setState({
            refsum10: parseInt(refsum10.toString())
        });

        let referrals2 = await Utils.contract.referrals2(this.state.account).call();

        let refsum11 = referrals2.refsum11;
        this.setState({
            refsum11: parseInt(refsum11.toString())
        });

        let refsum12 = referrals2.refsum12;
        this.setState({
            refsum12: parseInt(refsum12.toString())
        });
        let refsum13 = referrals2.refsum13;
        this.setState({
            refsum13: parseInt(refsum13.toString())
        });
        let refsum14 = referrals2.refsum14;
        this.setState({
            refsum14: parseInt(refsum14.toString())
        });
        let refsum15 = referrals2.refsum15;
        this.setState({
            refsum15: parseInt(refsum15.toString())
        });
        let refsum16 = referrals2.refsum16;
        this.setState({
            refsum16: parseInt(refsum16.toString())
        });
        let refsum17 = referrals2.refsum17;
        this.setState({
            refsum17: parseInt(refsum17.toString())
        });
        let refsum18 = referrals2.refsum18;
        this.setState({
            refsum18: parseInt(refsum18.toString())
        });
        let refsum19 = referrals2.refsum19;
        this.setState({
            refsum19: parseInt(refsum19.toString())
        });
        let refsum20 = referrals2.refsum20;
        this.setState({
            refsum20: parseInt(refsum20.toString())
        });

        let referralsBiz1 = await Utils.contract.referralsBiz1(this.state.account).call();

        let refbiz1 = referralsBiz1.refbiz1;
        this.setState({
            refbiz1: parseInt(refbiz1.toString())
        });

        let refbiz2 = referralsBiz1.refbiz2;
        this.setState({
            refbiz2: parseInt(refbiz2.toString())
        });
        let refbiz3 = referralsBiz1.refbiz3;
        this.setState({
            refbiz3: parseInt(refbiz3.toString())
        });
        let refbiz4 = referralsBiz1.refbiz4;
        this.setState({
            refbiz4: parseInt(refbiz4.toString())
        });
        let refbiz5 = referralsBiz1.refbiz5;
        this.setState({
            refbiz5: parseInt(refbiz5.toString())
        });
        let refbiz6 = referralsBiz1.refbiz6;
        this.setState({
            refbiz6: parseInt(refbiz6.toString())
        });
        let refbiz7 = referralsBiz1.refbiz7;
        this.setState({
            refbiz7: parseInt(refbiz7.toString())
        });
        let refbiz8 = referralsBiz1.refbiz8;
        this.setState({
            refbiz8: parseInt(refbiz8.toString())
        });
        let refbiz9 = referralsBiz1.refbiz9;
        this.setState({
            refbiz9: parseInt(refbiz9.toString())
        });
        let refbiz10 = referralsBiz1.refbiz10;
        this.setState({
            refbiz10: parseInt(refbiz10.toString())
        });

        let referralsBiz2 = await Utils.contract.referralsBiz2(this.state.account).call();

        let refbiz11 = referralsBiz2.refbiz11;
        this.setState({
            refbiz11: parseInt(refbiz11.toString())
        });

        let refbiz12 = referralsBiz2.refbiz12;
        this.setState({
            refbiz12: parseInt(refbiz12.toString())
        });
        let refbiz13 = referralsBiz2.refbiz13;
        this.setState({
            refbiz13: parseInt(refbiz13.toString())
        });
        let refbiz14 = referralsBiz2.refbiz14;
        this.setState({
            refbiz14: parseInt(refbiz14.toString())
        });
        let refbiz15 = referralsBiz2.refbiz15;
        this.setState({
            refbiz15: parseInt(refbiz15.toString())
        });
        let refbiz16 = referralsBiz2.refbiz16;
        this.setState({
            refbiz16: parseInt(refbiz16.toString())
        });
        let refbiz17 = referralsBiz2.refbiz17;
        this.setState({
            refbiz17: parseInt(refbiz17.toString())
        });
        let refbiz18 = referralsBiz2.refbiz18;
        this.setState({
            refbiz18: parseInt(refbiz18.toString())
        });
        let refbiz19 = referralsBiz2.refbiz19;
        this.setState({
            refbiz19: parseInt(refbiz19.toString())
        });
        let refbiz20 = referralsBiz2.refbiz20;
        this.setState({
            refbiz20: parseInt(refbiz20.toString())
        });


        let presentTime = await Utils.contract.getNow().call();
        this.setState({ presentTime: parseInt(presentTime.toString()) });
        // Calculation of ROI

        var maxMin = 0;
        var maxRoi = 0;
        var totalRoi = 0;
        var roi1 = 0;

        var roiClaimed = 0;
        var roiUnclaimed = 0;
        var totalRoi = 0;
        var roiClaimed = 0;
        var maxRec1 = 0;
        var cumRec = 0;
        let noOfSecs = 0;
        let noOfMins = 0;
        let noOfHours = 0;
        let noOfDays = 0;
        let total_receivable = 0;

        // console.log("maxrec " + maxRec1);
        // console.log("maxRoi " + maxRoi);

        for (var d = 1; d <= this.state.total_deposit_count; d++) {

            const deposit = await Utils.contract.deposits(d).call();
            //   console.log(deposit);
            let my_address = deposit.my_address;
            let deposit_amount = parseInt(deposit.deposit_amount.toString());
            let deposit_time = deposit.deposit_time;
            let max_payout = parseInt(deposit.max_payout.toString());


            this.setState({ my_address: window.tronWeb.address.fromHex(my_address) });

            if (this.state.my_address === this.state.account) {

                total_receivable += max_payout;
                // time in hours
                cumRec += max_payout;
                //  console.log("cum>payout" + cumRec + " - " + this.state.payoutSum)
                if (cumRec > this.state.payouts) {

                    noOfSecs = this.state.presentTime - deposit_time;
                    noOfMins = Math.floor(noOfSecs / 60); // 60
                    noOfHours = Math.floor(noOfMins / 60);
                    noOfDays = Math.floor(noOfHours / 60);

                    //    console.log(' No - ' + noOfMins + ' roi ' + roi1/sunny + '  ')
                    if (noOfDays > 250) {
                        noOfDays = 250;
                    }

                    roi1 = noOfDays * deposit_amount * this.state.dailyRoi / this.state.dailyRateDivisor;
                    if (roi1 >= max_payout) {
                        roi1 = max_payout;
                    }
                }
                console.log('dep amount ' + deposit_amount / sunny)
                console.log(' No - ' + noOfDays + ' roi ' + roi1 / sunny + '  ')
                totalRoi += roi1;

            }
            console.log('totalRoi ' + totalRoi / sunny);
            console.log('maxRec ' + total_receivable / sunny);

        }
        this.setState({ total_receivable: total_receivable / sunny });
        maxRoi = this.state.total_receivable - this.state.gen_bonus - this.state.direct_bonus;

        maxRec1 = this.state.total_receivable - this.state.payouts;
        this.setState({ maxRec1 });

        console.log(this.state.total_receivable + ' - ' + this.state.gen_bonus + ' - ' + this.state.direct_bonus + ' maxroi ' + maxRoi);
        totalRoi = totalRoi / sunny;

        if (totalRoi >= maxRoi) {
            totalRoi = maxRoi;
        }
        this.setState({ totalRoi });

        roiClaimed = this.state.payouts - this.state.direct_bonus - this.state.gen_bonus;
        this.setState({ roiClaimed });

        roiUnclaimed = this.state.totalRoi - this.state.roiClaimed;
        this.setState({ roiUnclaimed });
        console.log("total " + this.state.totalRoi + "- claimed " + this.state.roiClaimed)


        this.setState({ loading: false });
        this.setState({ sec: 18005 });

        console.log(this.props);
    }

    constructor(props) {
        super(props)

        this.state = {

            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestLoad: true,
            userStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            total_site_deposits: 0,

            lastDepositTime: 0,
            depositCount: 0,

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }

    }

    render() {
        const backStyle = {
            backgroundImage: `url(${back})`, backgroundAttachment: "fixed", fontFamily: "MyFont"
            , height: "auto", width: "100%", margin: "0", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", overflow: "hidden"
        };
        const colStyle = {
            backgroundColor: "red", opacity: "80%", backgroundImage: `url(${back1})`, marginTop: "20px", borderRadius: "20px", border: "5px solid white", marginLeft: "20px", marginRight: "20px",
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

            < div >
                <div style={backStyle}>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <a href={url} >  <img src={require("./img/logo2.png")} alt="Logo" width="400px" /></a>
                    </div>
                    <MyStats
                        my_address={this.state.my_address}
                        upline={this.state.upline}
                        direct_bonus={this.state.direct_bonus}
                        gen_bonus={this.state.gen_bonus}
                        deposit_payouts={this.state.deposit_payouts}
                        roiUnclaimed={this.state.roiUnclaimed}
                        total_deposits={this.state.total_deposits}
                        limit_remaining={this.state.maxRec1}
                        payouts={this.state.payouts}
                    />
                    <ReferStats
                        refsum1={this.state.refsum1}
                        refsum2={this.state.refsum2}
                        refsum3={this.state.refsum3}
                        refsum4={this.state.refsum4}
                        refsum5={this.state.refsum5}
                        refsum6={this.state.refsum6}
                        refsum7={this.state.refsum7}
                        refsum8={this.state.refsum8}
                        refsum9={this.state.refsum9}
                        refsum10={this.state.refsum10}
                        refsum11={this.state.refsum11}
                        refsum12={this.state.refsum12}
                        refsum13={this.state.refsum13}
                        refsum14={this.state.refsum14}
                        refsum15={this.state.refsum15}
                        refsum16={this.state.refsum16}
                        refsum17={this.state.refsum17}
                        refsum18={this.state.refsum18}
                        refsum19={this.state.refsum19}
                        refsum20={this.state.refsum20}

                        refbiz1={this.state.refbiz1}
                        refbiz2={this.state.refbiz2}
                        refbiz3={this.state.refbiz3}
                        refbiz4={this.state.refbiz4}
                        refbiz5={this.state.refbiz5}
                        refbiz6={this.state.refbiz6}
                        refbiz7={this.state.refbiz7}
                        refbiz8={this.state.refbiz8}
                        refbiz9={this.state.refbiz9}
                        refbiz10={this.state.refbiz10}
                        refbiz11={this.state.refbiz11}
                        refbiz12={this.state.refbiz12}
                        refbiz13={this.state.refbiz13}
                        refbiz14={this.state.refbiz14}
                        refbiz15={this.state.refbiz15}
                        refbiz16={this.state.refbiz16}
                        refbiz17={this.state.refbiz17}
                        refbiz18={this.state.refbiz18}
                        refbiz19={this.state.refbiz19}
                        refbiz20={this.state.refbiz20}

                    />
                </div>

            </div >
        );
    }
}
export default TopPage;
