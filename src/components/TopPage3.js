import React, { Component } from 'react';
import { toast } from 'react-toastify';
import back from "./img/brick.jpg"
import back1 from "./img/back.jpg"
import TronWeb from 'tronweb';
import Utils from 'utils';
//import Home from "./Home";
import GoBack from "./GoBack";
import SmartInfo from "./SmartInfo";
import MyStatsView from "./MyStatsView";
import ReferStatsView from "./ReferStatsView";
import ReferStatsInvestorView from "./ReferStatsInvestorView";
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
        await Utils.contract.checkOwner().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        });

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });
            // console.log(this.state.refid);
            let refUser = await Utils.contract.playersBiz(this.state.refid).call();
            // console.log(refUser);

            let refTotalInvestment = parseInt(refUser.myTotalInvestment.toString()) / sunny;
            // console.log(refTotalInvestment);
            if (refTotalInvestment >= 10) {
                this.setState({ refid: this.props.refLinkid });
            }
            else {
                this.setState({ refid: this.state.owner });
            }

        } else {
            this.setState({ refid: this.state.owner });
        }

        // console.log("refid " + this.state.refid);

        this.setState({ refLoading: false });

        const ManagerHex = window.tronWeb.address.toHex(MANAGER);
        // console.log('investor address ' + ManagerHex);
        this.setState({ ManagerHex });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account1: accTemp });
        this.setState({ account: this.state.refid });
        this.setState({ walletload: false });


        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });


        const totalInvested = await Utils.contract.totalInvested().call();
        this.setState({ totalInvested: 0.9 * parseInt(totalInvested.toString()) / sunny });
        this.setState({ totalInvested: Math.round(this.state.totalInvested / 100) * 100 });

        const contractBalance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contractBalance: contractBalance / sunny });

        const totalPayout = 0.8 * this.state.totalInvested - this.state.contractBalance;
        this.setState({ totalPayout });

        const totalPlayers = await Utils.contract.totalPlayers().call();
        this.setState({ totalPlayers: parseInt(totalPlayers.toString()) });

        const totalDepositCount = await Utils.contract.totalDepositCount().call();
        this.setState({ totalDepositCount: parseInt(totalDepositCount.toString()) });

        const dailyRate = await Utils.contract.dailyRate().call();
        this.setState({ dailyRate: parseInt(dailyRate.toString()) });

        const dailyRateDivisor = await Utils.contract.dailyRateDivisor().call();
        this.setState({ dailyRateDivisor: parseInt(dailyRateDivisor.toString()) });

        const plus1k = await Utils.contract.plus1k().call();
        this.setState({ plus1k: parseInt(plus1k.toString()) / sunny });

        const plus10k = await Utils.contract.plus10k().call();
        this.setState({ plus10k: parseInt(plus10k.toString()) / sunny });


        const minDepositSize = await Utils.contract.minDepositSize().call();
        this.setState({ minDepositSize: parseInt(minDepositSize.toString()) / sunny });
        // // console.log(this.state.minDepositSize);


        // // console.log('owner ' + this.state.owner);
        // // console.log('account ' + this.state.account);
        if (this.state.account === this.state.owner) {
            // console.log("true");
        }



        // // console.log('manager ' + this.state.manager);


        // Personal Stats - players

        let currentuser = await Utils.contract.players(this.state.account).call();
        let playerbiz = await Utils.contract.playersBiz(this.state.account).call();

        let trxDeposit = currentuser.trxDeposit;
        this.setState({
            trxDeposit: parseInt(trxDeposit.toString()) / sunny
        });

        let roiProfit = currentuser.roiProfit;
        this.setState({ roiProfit: parseInt(roiProfit.toString()) / sunny });

        let maxRec = currentuser.maxRec;
        this.setState({ maxRec: parseInt(maxRec.toString()) / sunny });

        let depositCount = currentuser.depositCount;
        this.setState({ depositCount: parseInt(depositCount.toString()) });
        // // console.log('depositCount ' + this.state.depositCount);

        let payoutSum = currentuser.payoutSum;
        this.setState({ payoutSum: parseInt(payoutSum.toString()) / sunny });

        let isActive = currentuser.isActive;
        this.setState({ isActive: parseInt(isActive.toString()) });
        this.setState({ refFrom: this.state.owner });

        if (this.state.isActive) {
            let refFrom = currentuser.refFrom;

            this.setState({ refFrom: window.tronWeb.address.fromHex(refFrom) });
            this.setState({ upline: this.state.refFrom });
        } else {
            this.setState({ upline: this.state.refid });
        }
        if (this.state.account === this.state.owner) {
            this.setState({ refFrom: "none" });
        }
        let myTotalInvestment = playerbiz.myTotalInvestment;
        this.setState({ myTotalInvestment: parseInt(myTotalInvestment.toString()) / sunny });
        this.setState({ totalInvestmentLoad: false });

        if (this.state.isActive) {
            this.setState({ playerStatus: "Active" });

        }


        let showaccstr = this.state.account.toString();
        let showacc = showaccstr.substring(0, 10);
        this.setState({ showacc });
        // console.log('show acc str ' + showacc);


        let showrefstr = this.state.upline.toString();
        let showref = showrefstr.substring(0, 10);
        this.setState({ showref });
        // console.log('show ref str ' + showref);

        let ref1sum = currentuser.ref1sum;
        this.setState({ ref1sum: parseInt(ref1sum.toString()) });

        let ref2sum = currentuser.ref2sum;
        this.setState({ ref2sum: parseInt(ref2sum.toString()) });

        let ref3sum = currentuser.ref3sum;
        this.setState({ ref3sum: parseInt(ref3sum.toString()) });

        let ref4sum = currentuser.ref4sum;
        this.setState({ ref4sum: parseInt(ref4sum.toString()) });

        let ref5sum = currentuser.ref5sum;
        this.setState({ ref5sum: parseInt(ref5sum.toString()) });


        let referrals1 = await Utils.contract.referrals1(this.state.account).call();
        let ref6sum = referrals1.ref6sum;
        this.setState({ ref6sum: parseInt(ref6sum.toString()) });

        let ref7sum = referrals1.ref7sum;
        this.setState({ ref7sum: parseInt(ref7sum.toString()) });
        let ref8sum = referrals1.ref8sum;
        this.setState({ ref8sum: parseInt(ref8sum.toString()) });
        let ref9sum = referrals1.ref9sum;
        this.setState({ ref9sum: parseInt(ref9sum.toString()) });
        let ref10sum = referrals1.ref10sum;
        this.setState({ ref10sum: parseInt(ref10sum.toString()) });

        let referrals2 = await Utils.contract.referrals2(this.state.account).call();
        let ref11sum = referrals2.ref11sum;
        this.setState({ ref11sum: parseInt(ref11sum.toString()) });
        let ref12sum = referrals2.ref12sum;
        this.setState({ ref12sum: parseInt(ref12sum.toString()) });
        let ref13sum = referrals2.ref13sum;
        this.setState({ ref13sum: parseInt(ref13sum.toString()) });
        let ref14sum = referrals2.ref14sum;
        this.setState({ ref14sum: parseInt(ref14sum.toString()) });
        let ref15sum = referrals2.ref15sum;
        this.setState({ ref15sum: parseInt(ref15sum.toString()) });
        let ref16sum = referrals2.ref16sum;
        this.setState({ ref16sum: parseInt(ref16sum.toString()) });
        let ref17sum = referrals2.ref17sum;
        this.setState({ ref17sum: parseInt(ref17sum.toString()) });
        let ref18sum = referrals2.ref18sum;
        this.setState({ ref18sum: parseInt(ref18sum.toString()) });
        let ref19sum = referrals2.ref19sum;
        this.setState({ ref19sum: parseInt(ref19sum.toString()) });
        let ref20sum = referrals2.ref20sum;
        this.setState({ ref20sum: parseInt(ref20sum.toString()) });

        let totalRefSum = this.state.ref1sum + this.state.ref2sum + this.state.ref3sum + this.state.ref4sum + this.state.ref5sum +
            this.state.ref6sum + this.state.ref7sum + this.state.ref8sum + this.state.ref9sum + this.state.ref10sum + this.state.ref11sum + this.state.ref12sum + this.state.ref13sum + this.state.ref14sum + this.state.ref15sum + this.state.ref16sum + this.state.ref17sum + this.state.ref18sum + this.state.ref19sum + this.state.ref20sum;

        let totalRefInvSum = totalRefSum + this.state.ref21sum + this.state.ref22sum + this.state.ref23sum + this.state.ref24sum + this.state.ref25sum +
            this.state.ref26sum + this.state.ref27sum + this.state.ref28sum + this.state.ref29sum + this.state.ref30sum + this.state.ref31sum + this.state.ref32sum + this.state.ref33sum + this.state.ref34sum + this.state.ref35sum + this.state.ref36sum + this.state.ref37sum + this.state.ref38sum + this.state.ref39sum + this.state.ref40sum;

        this.setState({ totalRefSum });
        this.setState({ totalRefInvSum });
        let refRewards = playerbiz.refRewards;
        this.setState({ refRewards: parseInt(refRewards.toString()) / sunny });
        let ref1biz = this.state.refRewards * 10;
        this.setState({ ref1biz: parseInt(ref1biz.toString()) });


        let referralsBiz1 = await Utils.contract.referralsBiz1(this.state.account).call();

        let ref2biz = referralsBiz1.ref2biz;
        let ref2biztemp = ref2biz;
        this.setState({ ref2biz: parseInt(ref2biz.toString()) / sunny });
        let ref3biz = referralsBiz1.ref3biz;
        this.setState({ ref3biz: parseInt(ref3biz.toString()) / sunny });
        let ref4biz = referralsBiz1.ref4biz;
        this.setState({ ref4biz: parseInt(ref4biz.toString()) / sunny });
        let ref5biz = referralsBiz1.ref5biz;
        this.setState({ ref5biz: parseInt(ref5biz.toString()) / sunny });

        let ref6biz = referralsBiz1.ref6biz;
        this.setState({ ref6biz: parseInt(ref6biz.toString()) / sunny });

        let ref7biz = referralsBiz1.ref7biz;
        this.setState({ ref7biz: parseInt(ref7biz.toString()) / sunny });
        let ref8biz = referralsBiz1.ref8biz;
        this.setState({ ref8biz: parseInt(ref8biz.toString()) / sunny });
        let ref9biz = referralsBiz1.ref9biz;
        this.setState({ ref9biz: parseInt(ref9biz.toString()) / sunny });
        let ref10biz = referralsBiz1.ref10biz;
        this.setState({ ref10biz: parseInt(ref10biz.toString()) / sunny });

        let referralsBiz2 = await Utils.contract.referralsBiz2(this.state.account).call();
        let ref11biz = referralsBiz2.ref11biz;
        this.setState({ ref11biz: parseInt(ref11biz.toString()) / sunny });
        let ref12biz = referralsBiz2.ref12biz;
        this.setState({ ref12biz: parseInt(ref12biz.toString()) / sunny });
        let ref13biz = referralsBiz2.ref13biz;
        this.setState({ ref13biz: parseInt(ref13biz.toString()) / sunny });
        let ref14biz = referralsBiz2.ref14biz;
        this.setState({ ref14biz: parseInt(ref14biz.toString()) / sunny });
        let ref15biz = referralsBiz2.ref15biz;
        this.setState({ ref15biz: parseInt(ref15biz.toString()) / sunny });
        let ref16biz = referralsBiz2.ref16biz;
        this.setState({ ref16biz: parseInt(ref16biz.toString()) / sunny });
        let ref17biz = referralsBiz2.ref17biz;
        this.setState({ ref17biz: parseInt(ref17biz.toString()) / sunny });
        let ref18biz = referralsBiz2.ref18biz;
        this.setState({ ref18biz: parseInt(ref18biz.toString()) / sunny });
        let ref19biz = referralsBiz2.ref19biz;
        this.setState({ ref19biz: parseInt(ref19biz.toString()) / sunny });
        let ref20biz = referralsBiz2.ref20biz;
        this.setState({ ref20biz: parseInt(ref20biz.toString()) / sunny });

        let referralsBiz3 = await Utils.contract.referralsBiz3(this.state.account).call();
        let ref21biz = referralsBiz3.ref21biz;
        this.setState({ ref21biz: parseInt(ref21biz.toString()) / sunny });
        let ref22biz = referralsBiz3.ref22biz;
        this.setState({ ref22biz: parseInt(ref22biz.toString()) / sunny });
        let ref23biz = referralsBiz3.ref23biz;
        this.setState({ ref23biz: parseInt(ref23biz.toString()) / sunny });
        let ref24biz = referralsBiz3.ref24biz;
        this.setState({ ref24biz: parseInt(ref24biz.toString()) / sunny });
        let ref25biz = referralsBiz3.ref25biz;
        this.setState({ ref25biz: parseInt(ref25biz.toString()) / sunny });
        let ref26biz = referralsBiz3.ref26biz;
        this.setState({ ref26biz: parseInt(ref26biz.toString()) / sunny });
        let ref27biz = referralsBiz3.ref27biz;
        this.setState({ ref27biz: parseInt(ref27biz.toString()) / sunny });
        let ref28biz = referralsBiz3.ref28biz;
        this.setState({ ref28biz: parseInt(ref28biz.toString()) / sunny });
        let ref29biz = referralsBiz3.ref29biz;
        this.setState({ ref29biz: parseInt(ref29biz.toString()) / sunny });
        let ref30biz = referralsBiz3.ref30biz;
        this.setState({ ref30biz: parseInt(ref30biz.toString()) / sunny });

        let referralsBiz4 = await Utils.contract.referralsBiz4(this.state.account).call();
        let ref31biz = referralsBiz4.ref31biz;
        this.setState({ ref31biz: parseInt(ref31biz.toString()) / sunny });
        let ref32biz = referralsBiz4.ref32biz;
        this.setState({ ref32biz: parseInt(ref32biz.toString()) / sunny });
        let ref33biz = referralsBiz4.ref33biz;
        this.setState({ ref33biz: parseInt(ref33biz.toString()) / sunny });
        let ref34biz = referralsBiz4.ref34biz;
        this.setState({ ref34biz: parseInt(ref34biz.toString()) / sunny });
        let ref35biz = referralsBiz4.ref35biz;
        this.setState({ ref35biz: parseInt(ref35biz.toString()) / sunny });
        let ref36biz = referralsBiz4.ref36biz;
        this.setState({ ref36biz: parseInt(ref36biz.toString()) / sunny });
        let ref37biz = referralsBiz4.ref37biz;
        this.setState({ ref37biz: parseInt(ref37biz.toString()) / sunny });
        let ref38biz = referralsBiz4.ref38biz;
        this.setState({ ref38biz: parseInt(ref38biz.toString()) / sunny });
        let ref39biz = referralsBiz4.ref39biz;
        this.setState({ ref39biz: parseInt(ref39biz.toString()) / sunny });
        let ref40biz = referralsBiz4.ref40biz;
        this.setState({ ref40biz: parseInt(ref40biz.toString()) / sunny });

        let totalRefBiz = this.state.ref1biz + this.state.ref2biz + this.state.ref3biz + this.state.ref4biz + this.state.ref5biz + this.state.ref6biz + this.state.ref7biz + this.state.ref8biz + this.state.ref9biz + this.state.ref10biz + this.state.ref11biz + this.state.ref12biz + this.state.ref13biz + this.state.ref14biz + this.state.ref15biz + this.state.ref16biz + this.state.ref17biz + this.state.ref18biz + this.state.ref19biz + this.state.ref20biz;

        let totalRefInvBiz = totalRefBiz + this.state.ref21biz + this.state.ref22biz + this.state.ref23biz + this.state.ref24biz + this.state.ref25biz + this.state.ref26biz + this.state.ref27biz + this.state.ref28biz + this.state.ref29biz + this.state.ref30biz + this.state.ref31biz + this.state.ref32biz + this.state.ref33biz + this.state.ref34biz + this.state.ref35biz + this.state.ref36biz + this.state.ref37biz + this.state.ref38biz + this.state.ref39biz + this.state.ref40biz;

        this.setState({ totalRefBiz });
        this.setState({ totalRefInvBiz });

        let payRewardsSent = currentuser.payRewardsSent;
        this.setState({ payRewardsSent: parseInt(payRewardsSent.toString()) });
        // Business - playersBiz


        let myTotalDirectBiz = playerbiz.myTotalDirectBiz;
        this.setState({ myTotalDirectBiz: parseInt(myTotalDirectBiz.toString()) / sunny });

        let directBiz = playerbiz.directBiz;
        this.setState({ directBiz: parseInt(directBiz.toString()) / sunny });

        let myTotalBiz = playerbiz.myTotalBiz;
        this.setState({ myTotalBiz: parseInt(myTotalBiz.toString()) / sunny });

        let joiningTime = playerbiz.joiningTime;
        this.setState({ joiningTime: parseInt(joiningTime.toString()) });

        let lastroiPaid = playerbiz.lastroiPaid;
        this.setState({ lastroiPaid: parseInt(lastroiPaid.toString()) });

        let lastDeposit = playerbiz.lastDeposit;
        this.setState({ lastDeposit: parseInt(lastDeposit.toString()) / sunny });
        // // console.log('last dep ' + this.state.lastDeposit);

        let payRewards = playerbiz.payRewards;
        this.setState({ payRewards: parseInt(payRewards.toString()) / sunny });

        let totalRewards = playerbiz.totalRewards;
        this.setState({ totalRewards: parseInt(totalRewards.toString()) / sunny });
        // this.setState({ refid: this.state.owner });


        // // console.log(this.props)

        //  // console.log(this.state.refLinkAddress);
        let presentTime = await Utils.contract.getNow().call();
        this.setState({ presentTime: parseInt(presentTime.toString()) });

        let getTime = await Utils.contract.getTime().call();
        this.setState({ getTime: parseInt(getTime.toString()) });

        // Calculation of ROI

        var normalSec = 0;
        var totalSec = 0;
        var maxMin = 0;
        var maxRoi = 0;
        var totalRoi = 0;
        var roi1 = 0;
        var roi2 = 0;
        var maxRecRoi = 0;
        let totalTime = 0;
        let netTime = 0;

        var roiClaimed = 0;
        var roiUnclaimed = 0;
        var totalRoi = 0;
        var roiGenerated = 0;
        var roiClaimed = 0;
        var maxRec1 = 0;
        var cumRec = 0;
        let noOfSecs = 0;
        let noOfMins = 0;
        let noOfHours = 0;
        let noOfDays = 0;

        let paySum = 0;

        maxRoi = this.state.maxRec - this.state.totalRewards;

        maxRec1 = this.state.maxRec - this.state.payoutSum;
        this.setState({ maxRec1 });
        // // console.log("maxrec " + maxRec1);
        // // console.log("maxRoi " + maxRoi);

        for (var d = 1; d <= this.state.totalDepositCount; d++) {

            const deposit = await Utils.contract.deposits(d).call();
            //   // console.log(deposit);
            let depAddress = deposit.depAddress;



            let depMaxRec = deposit.maxRec;
            let deptime = deposit.time;
            let depAmount = deposit.amount;
            let depIsActive = deposit.isActive;


            this.setState({ depAddress: window.tronWeb.address.fromHex(depAddress) });
            //  const depAddress = window.tronWeb.address.fromHex(deposit.player);
            //   // console.log('hex address ' + this.state.depAddress);
            //  // console.log("player " + address);
            //    // console.log("depAddress" + this.state.depAddress)

            if (this.state.depAddress === this.state.account) {
                // time in hours
                cumRec += depMaxRec;
                //  // console.log("cum>payout" + cumRec + " - " + this.state.payoutSum)
                if (cumRec > this.state.payoutSum) {

                    noOfSecs = this.state.presentTime - deptime;
                    noOfMins = Math.floor(noOfSecs / 60); // 60
                    noOfHours = Math.floor(noOfMins / 60);
                    noOfDays = Math.floor(noOfSecs / 86400);

                    //    // console.log(' No - ' + noOfMins + ' roi ' + roi1/sunny + '  ')
                    if (noOfDays > 250) {
                        noOfDays = 250;
                    }

                    roi1 = noOfDays * depAmount * this.state.dailyRate / this.state.dailyRateDivisor;
                    if (roi1 >= depMaxRec) {
                        roi1 = depMaxRec;
                    }
                }
                // // console.log('dep amount ' + depAmount / sunny)
                // // console.log(' No - ' + noOfHours + ' roi ' + roi1 / sunny + '  ')
                totalRoi += roi1;

            }
            // console.log('totalRoi ' + totalRoi / sunny);

        }


        // console.log('maxroi ' + maxRoi);
        totalRoi = totalRoi / sunny;

        if (totalRoi >= maxRoi) {
            totalRoi = maxRoi;
        }

        this.setState({ totalRoi });

        roiClaimed = this.state.payoutSum - this.state.totalRewards;
        this.setState({ roiClaimed });

        roiUnclaimed = this.state.totalRoi - this.state.roiClaimed;
        this.setState({ roiUnclaimed });

        this.setState({ roiLoading: false });
        // // console.log("total " + this.state.totalRoi + "- claimed " + this.state.roiClaimed)
        let ref2biz2 = 0;
        let biz1 = 0;

        // let ref2biz = 0;
        // let biz2 = 0;
        //level 1
        //   console.log(totalDepositCount);
        // for (let y1 = 1; y1 <= this.state.totalDepositCount; y1++) {
        //     let deposit1 = await Utils.contract.deposits(y1).call();
        //     let depAddr1 = deposit1.depAddress;
        //     let user1biz = await Utils.contract.playersBiz(depAddr1).call();
        //     let user1 = await Utils.contract.players(depAddr1).call();
        //     //     console.log(user1.refFrom);
        //     let refer1 = user1.refFrom;

        //     this.setState({ refer1: window.tronWeb.address.fromHex(refer1) });
        //     //  console.log(this.state.refer);

        //     if (this.state.refer1 === this.state.account) {
        //         let biz1 = 10 * user1biz.refRewards;
        //         this.setState({ biz1: parseInt(biz1.toString()) / sunny });
        //         //    console.log(this.state.biz1)

        //         ref2biz2 += this.state.biz1;
        //     }
        // }


        //         // for (let y2 = 1; y2 <= this.state.totalDepositCount; y2++) {
        //         //     let deposit2 = await Utils.contract.deposits(y2).call();
        //         //     let depAddr2 = deposit2.depAddress;
        //         //     let user2biz = await Utils.contract.playersBiz(depAddr2).call();
        //         //     let user2 = await Utils.contract.players(depAddr2).call();
        //         //     //     // console.log(user2.refFrom);
        //         //     let refer2 = user2.refFrom;

        //         //     this.setState({ refer2: window.tronWeb.address.fromHex(refer2) });
        //         //     //  // console.log(this.state.refer);

        //         //     if (this.state.refer2 === this.state.refer1) {
        //         //         let biz2 = user2biz.myTotalInvestment;
        //         //         this.setState({ biz2: parseInt(biz2.toString()) / sunny });
        //         //         // // console.log(this.state.biz2)

        //         //         ref2biz += this.state.biz2;



        //         //         // level 2


        //         //     }
        //         // }
        //     }
        // }
        // this.setState({ ref2biz2 });
        // this.setState({ ref2biztemp: parseInt(ref2biztemp.toString()) / sunny });
        // this.setState({ ref2biz: ref2biz2 });

        // this.setState({ totalRefBiz: this.state.totalRefBiz + this.state.ref2biz2 - this.state.ref2biztemp });

        const payID = await Utils.contract.payID().call();
        this.setState({ payID: parseInt(payID.toString()) });
        if (this.state.refid === "undefined") {
            this.setState({ refid: this.state.owner });
        }
        //  console.log('Last ref ' + this.state.refid);
        this.setState({ loading: false });

        // let own = "Some address";
        // this.setState({ owner: own });
    }


    invest(refid, amount) {

        return Utils.contract
            .invest(refid)
            .send({
                from: this.state.account,
                callValue: Number(amount) * 1000000,
            }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }


    reinvest(amount) {

        return Utils.contract
            .reinvest()
            .send({
                from: this.state.account,
                callValue: Number(amount) * 1000000,
            }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }))
    }

    withdraw(amount) {
        return Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success('  Withdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }
            ))
    }

    collect(address) {
        this.setState({ loading: true });
        return Utils.contract
            .collect(address)
            .send({
                from: this.state.account,
            }).then(res =>
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 10000)
            );
    }

    //somewhere else
    changeOwner(owner) {
        return Utils.contract
            .changeOwner(owner)
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Own Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }



    changeManager(manager) {

        return Utils.contract
            .changeManager(manager)
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Man Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }



    copyHandler1 = (e) => {
        this.textArea1.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess1: true });
    };



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
            roiLoading: true,
        }

        this.invest = this.invest.bind(this);
        this.reinvest = this.reinvest.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.collect = this.collect.bind(this);
        this.copyHandler1 = this.copyHandler1.bind(this);
        this.changeOwner = this.changeOwner.bind(this);
        this.changeManager = this.changeManager.bind(this);

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


                    <MyStatsView
                        userStatus={this.state.playerStatus}
                        my_address={this.state.showacc}
                        upline={this.state.showref}
                        direct_bonus={this.state.refRewards}
                        gen_bonus={this.state.payRewards}
                        roiUnclaimed={this.state.roiUnclaimed}
                        roiClaimed={this.state.roiClaimed}
                        total_deposits={this.state.myTotalInvestment}
                        limit_remaining={this.state.maxRec1}
                        withdraw={this.withdraw}
                        walletload={this.state.walletload}
                        payouts={this.state.payoutSum}
                        roiLoading={this.state.roiLoading}

                    />
                    {this.state.account1 === this.state.owner
                        ? <ReferStatsInvestorView
                            refsum1={this.state.ref1sum}
                            refsum2={this.state.ref2sum}
                            refsum3={this.state.ref3sum}
                            refsum4={this.state.ref4sum}
                            refsum5={this.state.ref5sum}
                            refsum6={this.state.ref6sum}
                            refsum7={this.state.ref7sum}
                            refsum8={this.state.ref8sum}
                            refsum9={this.state.ref9sum}
                            refsum10={this.state.ref10sum}
                            refsum11={this.state.ref11sum}
                            refsum12={this.state.ref12sum}
                            refsum13={this.state.ref13sum}
                            refsum14={this.state.ref14sum}
                            refsum15={this.state.ref15sum}
                            refsum16={this.state.ref16sum}
                            refsum17={this.state.ref17sum}
                            refsum18={this.state.ref18sum}
                            refsum19={this.state.ref19sum}
                            refsum20={this.state.ref20sum}
                            refsum21={this.state.ref21sum}
                            refsum22={this.state.ref22sum}
                            refsum23={this.state.ref23sum}
                            refsum24={this.state.ref24sum}
                            refsum25={this.state.ref25sum}
                            refsum26={this.state.ref26sum}
                            refsum27={this.state.ref27sum}
                            refsum28={this.state.ref28sum}
                            refsum29={this.state.ref29sum}
                            refsum30={this.state.ref30sum}
                            refsum31={this.state.ref31sum}
                            refsum32={this.state.ref32sum}
                            refsum33={this.state.ref33sum}
                            refsum34={this.state.ref34sum}
                            refsum35={this.state.ref35sum}
                            refsum36={this.state.ref36sum}
                            refsum37={this.state.ref37sum}
                            refsum38={this.state.ref38sum}
                            refsum39={this.state.ref39sum}
                            refsum40={this.state.ref40sum}

                            refbiz1={this.state.ref1biz}
                            refbiz2={this.state.ref2biz}
                            refbiz3={this.state.ref3biz}
                            refbiz4={this.state.ref4biz}
                            refbiz5={this.state.ref5biz}
                            refbiz6={this.state.ref6biz}
                            refbiz7={this.state.ref7biz}
                            refbiz8={this.state.ref8biz}
                            refbiz9={this.state.ref9biz}
                            refbiz10={this.state.ref10biz}
                            refbiz11={this.state.ref11biz}
                            refbiz12={this.state.ref12biz}
                            refbiz13={this.state.ref13biz}
                            refbiz14={this.state.ref14biz}
                            refbiz15={this.state.ref15biz}
                            refbiz16={this.state.ref16biz}
                            refbiz17={this.state.ref17biz}
                            refbiz18={this.state.ref18biz}
                            refbiz19={this.state.ref19biz}
                            refbiz20={this.state.ref20biz}
                            refbiz21={this.state.ref21biz}
                            refbiz22={this.state.ref22biz}
                            refbiz23={this.state.ref23biz}
                            refbiz24={this.state.ref24biz}
                            refbiz25={this.state.ref25biz}
                            refbiz26={this.state.ref26biz}
                            refbiz27={this.state.ref27biz}
                            refbiz28={this.state.ref28biz}
                            refbiz29={this.state.ref29biz}
                            refbiz30={this.state.ref30biz}
                            refbiz31={this.state.ref31biz}
                            refbiz32={this.state.ref32biz}
                            refbiz33={this.state.ref33biz}
                            refbiz34={this.state.ref34biz}
                            refbiz35={this.state.ref35biz}
                            refbiz36={this.state.ref36biz}
                            refbiz37={this.state.ref37biz}
                            refbiz38={this.state.ref38biz}
                            refbiz39={this.state.ref39biz}
                            refbiz40={this.state.ref40biz}

                            totalRefInvBiz={this.state.totalRefInvBiz}
                            totalRefInvSum={this.state.totalRefInvSum}

                        />

                        : <ReferStatsView
                            refsum1={this.state.ref1sum}
                            refsum2={this.state.ref2sum}
                            refsum3={this.state.ref3sum}
                            refsum4={this.state.ref4sum}
                            refsum5={this.state.ref5sum}
                            refsum6={this.state.ref6sum}
                            refsum7={this.state.ref7sum}
                            refsum8={this.state.ref8sum}
                            refsum9={this.state.ref9sum}
                            refsum10={this.state.ref10sum}
                            refsum11={this.state.ref11sum}
                            refsum12={this.state.ref12sum}
                            refsum13={this.state.ref13sum}
                            refsum14={this.state.ref14sum}
                            refsum15={this.state.ref15sum}
                            refsum16={this.state.ref16sum}
                            refsum17={this.state.ref17sum}
                            refsum18={this.state.ref18sum}
                            refsum19={this.state.ref19sum}
                            refsum20={this.state.ref20sum}

                            refbiz1={this.state.ref1biz}
                            refbiz2={this.state.ref2biz}
                            refbiz3={this.state.ref3biz}
                            refbiz4={this.state.ref4biz}
                            refbiz5={this.state.ref5biz}
                            refbiz6={this.state.ref6biz}
                            refbiz7={this.state.ref7biz}
                            refbiz8={this.state.ref8biz}
                            refbiz9={this.state.ref9biz}
                            refbiz10={this.state.ref10biz}
                            refbiz11={this.state.ref11biz}
                            refbiz12={this.state.ref12biz}
                            refbiz13={this.state.ref13biz}
                            refbiz14={this.state.ref14biz}
                            refbiz15={this.state.ref15biz}
                            refbiz16={this.state.ref16biz}
                            refbiz17={this.state.ref17biz}
                            refbiz18={this.state.ref18biz}
                            refbiz19={this.state.ref19biz}
                            refbiz20={this.state.ref20biz}
                            totalRefBiz={this.state.totalRefBiz}
                            totalRefSum={this.state.totalRefSum}

                        />


                    }

                    <GoBack />
                </div>

            </div >
        );
    }
}
export default TopPage;
