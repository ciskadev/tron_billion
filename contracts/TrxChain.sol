pragma solidity 0.5.4;

contract TrxChain {
 
    struct User {

        uint256 deposit_count;
        uint8 isActive;
        uint256 total_bonus;
        uint256 total_roi;
        uint256 first_deposit_time;
        address payable upline;
        uint256 directs;
        uint256 payouts;
        uint256 direct_bonus;
        uint256 gen_bonus;
        uint256 roi_payable; 
        uint256 total_deposits;
        uint256 total_structure;
         
        uint256 gen_rewards_sent; 
         
    }

    struct Deposit {
        
        uint256 id;
        uint256 deposit_amount;
        uint256 roi_payable;
        uint256 deposit_time;
        address payable my_address;
        uint256 max_payout; 
        uint8 isActive;
    }

      struct Referrals1 {
         uint refsum1;
         uint refsum2;
         uint refsum3;
         uint refsum4;
         uint refsum5;
         uint refsum6;
         uint refsum7;
         uint refsum8;
         uint refsum9;
         uint refsum10;
    }
      struct Referrals2 {
         uint refsum11;
         uint refsum12;
         uint refsum13;
         uint refsum14;
         uint refsum15;
         uint refsum16;
         uint refsum17;
         uint refsum18;
         uint refsum19;
         uint refsum20;
    }

  struct ReferralsBiz1 {
         uint refbiz1;
         uint refbiz2;
         uint refbiz3;
         uint refbiz4;
         uint refbiz5;
         uint refbiz6;
         uint refbiz7;
         uint refbiz8;
         uint refbiz9;
         uint refbiz10;
    }
    
  struct ReferralsBiz2 {
         uint refbiz11;
         uint refbiz12;
         uint refbiz13;
         uint refbiz14;
         uint refbiz15;
         uint refbiz16;
         uint refbiz17;
         uint refbiz18;
         uint refbiz19;
         uint refbiz20;
         
    }

  struct ReferralsBiz3{
        
         
         uint refbiz21;
         uint refbiz22;
         uint refbiz23;
         uint refbiz24;
         uint refbiz25;
         uint refbiz26;
         uint refbiz27;
         uint refbiz28;
         uint refbiz29;
         uint refbiz30;
    }
   
     struct ReferralsBiz4{ 
         uint refbiz31;
         uint refbiz32;
         uint refbiz33;
         uint refbiz34;
         uint refbiz35;
         uint refbiz36;
         uint refbiz37;
         uint refbiz38;
         uint refbiz39;
         uint refbiz40;
    }
     

    address payable public owner;
    address payable public admin_fee;
    uint  public  dailyRoi = 14;
    uint  public  dailyRate = 1000;
    uint  public  sunny = 1000000;
    uint public dailySeconds = 10;

    mapping(address => User) public users;
    mapping(address => Referrals1) public referrals1;
    mapping(address => Referrals2) public referrals2;
    mapping(address => ReferralsBiz1) public referralsBiz1;
    mapping(address => ReferralsBiz2) public referralsBiz2;
    mapping(address => ReferralsBiz3) public referralsBiz3;
    mapping(address => ReferralsBiz4) public referralsBiz4;
    mapping(uint => Deposit) public deposits;

     uint8[] public ref_bonuses;                     // 1 => 1% 
     uint256[] public level_roi_max;                     // 1 => 1% 

    uint256 public total_users = 1;
    uint256 public total_deposit_count = 1;
    uint256 public total_site_deposits;
    uint256 public total_withdraw;
    uint256 public min_deposit = 10*sunny;
    
    event Upline(address indexed addr, address indexed upline);
    event NewDeposit(address indexed addr, uint256 amount);
    event DirectPayout(address indexed addr, address indexed from, uint256 amount);
    event GenPayout(address indexed addr, address indexed from, uint256 amount);
    event Withdraw(address indexed addr, uint256 amount);
    event LimitReached(address indexed addr, uint256 amount);
 

    constructor( ) public { 
        
        admin_fee = 0x41F6fAb3DaeAb041F9eC03565Cff12c2015891E3;
        owner = 0x41F6fAb3DaeAb041F9eC03565Cff12c2015891E3; 

           
        ref_bonuses.push(40);
        ref_bonuses.push(10);
        ref_bonuses.push(10);
        ref_bonuses.push(10);
        ref_bonuses.push(10);

        ref_bonuses.push(8);
        ref_bonuses.push(8);
        ref_bonuses.push(8);
        ref_bonuses.push(8);
        ref_bonuses.push(8);
        
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        
        ref_bonuses.push(1);
        ref_bonuses.push(1);
        ref_bonuses.push(1);
        ref_bonuses.push(1);
        ref_bonuses.push(1);
  
         User storage user = users[owner];
         user.total_deposits = 10000*sunny;
         user.isActive = 1;
         user.deposit_count = 1;
          user.first_deposit_time = now;  

         Deposit storage deposit = deposits[total_deposit_count];
         deposit.my_address = owner;
         deposit.isActive = 1;
         deposit.deposit_amount = 10000*sunny;
         deposit.max_payout = 1000000*sunny;
         deposit.deposit_time = now;

     }

    function() payable external {
        _deposit(msg.sender, msg.value );
    }

    function _setUpline(address payable _addr, address payable _upline) private {


        if(users[_addr].upline == address(0) && _upline != _addr && _addr != owner && (users[_upline].isActive == 1 || _upline == owner)) {
            users[_addr].upline = _upline;
            users[_upline].directs++;

            emit Upline(_addr, _upline);

            total_users++;

            for(uint8 i = 0; i < ref_bonuses.length; i++) {
                if(_upline == address(0)) break;

                users[_upline].total_structure++; 
                _upline = users[_upline].upline;
            }
            update_ref_sum1(_addr,  msg.value);
         }
    }
    
    function update_ref_sum1(address _addr, uint amount) private {
    
      address _upline1 = users[_addr].upline;

      address _upline2 = users[_upline1].upline;
      address _upline3 = users[_upline2].upline;
      address _upline4 = users[_upline3].upline;
      address _upline5 = users[_upline4].upline;
      address _upline6 = users[_upline5].upline;
      address _upline7 = users[_upline6].upline;
      address _upline8 = users[_upline7].upline;
      address _upline9 = users[_upline8].upline;
      address _upline10 = users[_upline9].upline;
     

      referrals1[_upline1].refsum1++;
      referrals1[_upline2].refsum2++;
      referrals1[_upline3].refsum3++;
      referrals1[_upline4].refsum4++; 
      referrals1[_upline5].refsum5++;
      referrals1[_upline6].refsum6++; 
      referrals1[_upline7].refsum7++;
      referrals1[_upline8].refsum8++; 
      referrals1[_upline9].refsum9++;
      referrals1[_upline10].refsum10++;
    
      referralsBiz1[_upline1].refbiz1 += amount; 
      referralsBiz1[_upline2].refbiz2 += amount; 
      referralsBiz1[_upline3].refbiz3 += amount;
      referralsBiz1[_upline4].refbiz4 += amount;
      referralsBiz1[_upline5].refbiz5 += amount;
      referralsBiz1[_upline6].refbiz6 += amount;
      referralsBiz1[_upline7].refbiz7 += amount;
      referralsBiz1[_upline8].refbiz8 += amount;
      referralsBiz1[_upline9].refbiz9 += amount;
      referralsBiz1[_upline10].refbiz10 += amount;
    
      update_ref_sum2(_upline10, amount);
    }

    function update_ref_sum2(address _upline10, uint amount) private {

      address _upline11 = users[_upline10].upline;
      address _upline12 = users[_upline11].upline;
      address _upline13 = users[_upline12].upline; 
      address _upline14 = users[_upline13].upline;
      address _upline15 = users[_upline14].upline;
      address _upline16 = users[_upline15].upline;
      address _upline17 = users[_upline16].upline;
      address _upline18 = users[_upline17].upline;
      address _upline19 = users[_upline18].upline;
      address _upline20 = users[_upline19].upline;
     
  
      referrals2[_upline11].refsum11++;
      referrals2[_upline12].refsum12++;
      referrals2[_upline13].refsum13++;
      referrals2[_upline14].refsum14++;
      referrals2[_upline15].refsum15++;
      referrals2[_upline16].refsum16++;
      referrals2[_upline17].refsum17++;
      referrals2[_upline18].refsum18++;
      referrals2[_upline19].refsum19++;
      referrals2[_upline20].refsum20++;

      referralsBiz2[_upline11].refbiz11 += amount;
      referralsBiz2[_upline12].refbiz12 += amount;
      referralsBiz2[_upline13].refbiz13 += amount;    
      referralsBiz2[_upline14].refbiz14 += amount;
      referralsBiz2[_upline15].refbiz15 += amount;
      referralsBiz2[_upline16].refbiz16 += amount;
      referralsBiz2[_upline17].refbiz17 += amount;
      referralsBiz2[_upline18].refbiz18 += amount;
      referralsBiz2[_upline19].refbiz19 += amount;
      referralsBiz2[_upline20].refbiz20 += amount;

     
      update_ref_sum3(_upline20, amount);

  
     }

     function update_ref_sum3(address _upline20, uint amount) private {
    
      address _upline21 = users[_upline20].upline;
      address _upline22 = users[_upline21].upline;
      address _upline23 = users[_upline22].upline;
      address _upline24 = users[_upline23].upline;
      address _upline25 = users[_upline24].upline;
      address _upline26 = users[_upline25].upline;
      address _upline27 = users[_upline26].upline;
      address _upline28 = users[_upline27].upline; 
      address _upline29 = users[_upline28].upline;
      address _upline30 = users[_upline29].upline;

      referralsBiz3[_upline21].refbiz21 += amount;
      referralsBiz3[_upline22].refbiz22 += amount;
      referralsBiz3[_upline23].refbiz23 += amount;
      referralsBiz3[_upline24].refbiz24 += amount;
      referralsBiz3[_upline25].refbiz25 += amount;
      referralsBiz3[_upline26].refbiz26 += amount;
      referralsBiz3[_upline27].refbiz27 += amount;
      referralsBiz3[_upline28].refbiz28 += amount;      
      referralsBiz3[_upline29].refbiz29 += amount;
      referralsBiz3[_upline30].refbiz30 += amount;

      update_ref_sum4(_upline30, amount);

     
     }
 
 
     function update_ref_sum4(address _upline30, uint amount) private {



      address _upline31 = users[_upline30].upline;
      address _upline32 = users[_upline31].upline;
      address _upline33 = users[_upline32].upline;
      address _upline34 = users[_upline33].upline;
      address _upline35 = users[_upline34].upline;
      address _upline36 = users[_upline35].upline;
      address _upline37 = users[_upline36].upline;
      address _upline38 = users[_upline37].upline;
      address _upline39 = users[_upline38].upline;
      address _upline40 = users[_upline39].upline;
  
      referralsBiz4[_upline31].refbiz31 += amount;
      referralsBiz4[_upline32].refbiz32 += amount;
      referralsBiz4[_upline33].refbiz33 += amount;
      referralsBiz4[_upline34].refbiz34 += amount;
      referralsBiz4[_upline35].refbiz35 += amount;
      referralsBiz4[_upline36].refbiz36 += amount;
      referralsBiz4[_upline37].refbiz37 += amount;
      referralsBiz4[_upline38].refbiz38 += amount;      
      referralsBiz4[_upline39].refbiz39 += amount;
      referralsBiz4[_upline40].refbiz40 += amount;
  
     }
 
     function _deposit(address payable _addr, uint256 _amount) public payable {

        require(users[_addr].upline != address(0) || _addr == owner, "No upline"); 

        users[_addr].payouts = 0;
        users[_addr].deposit_count = 1;
        users[_addr].isActive = 1;
        users[_addr].total_deposits += _amount;

        total_deposit_count ++;
     
        Deposit storage user_deposit = deposits[total_deposit_count];
        user_deposit.my_address = _addr;
        user_deposit.deposit_amount = _amount;
        user_deposit.roi_payable = 0;
        user_deposit.max_payout = 35*_amount/10;
        user_deposit.deposit_time = now; 

        total_site_deposits += _amount;  
        
        emit NewDeposit(_addr, _amount);
     
        if(users[_addr].upline != address(0)) {
         address payable up = users[_addr].upline; 
          
          uint max_payout = 0 ;
             for(uint _i=1; _i <= total_deposit_count; _i++){
               if(deposits[_i].my_address == _addr){
                   max_payout += deposits[_i].max_payout;
              }
           }

            uint direct_bonus = _amount/10;

            if(users[up].isActive == 1 && users[up].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[up].payouts;
            }
             users[up].direct_bonus += _amount / 10; 
             users[up].payouts += direct_bonus; 
             users[up].total_bonus += direct_bonus;
             up.transfer(direct_bonus);

            emit DirectPayout(users[_addr].upline, _addr, _amount / 10);
        } 
        admin_fee.transfer(_amount / 5);
     //   etherchain_fund.transfer(_amount * 3 / 100);
        
    }  

 function _redeposit(address payable _addr, uint256 _amount ) public payable {
     
        users[_addr].isActive = 1;
        users[_addr].deposit_count++;
        users[_addr].total_deposits += _amount;
        
        total_deposit_count ++;
     
        Deposit storage user_deposit = deposits[total_deposit_count];
        user_deposit.my_address = _addr;
        user_deposit.deposit_amount = msg.value;
        user_deposit.roi_payable = 0;
        user_deposit.max_payout = 35*msg.value/10;
        user_deposit.deposit_time = now; 

        total_site_deposits += msg.value; 
        
         emit NewDeposit(_addr, msg.value);
      
        if(users[_addr].upline != address(0)) {
            address payable up = users[_addr].upline; 
           uint max_payout = 0 ;
         for(uint _i=1; _i <= total_deposit_count; _i++){
             if(deposits[_i].my_address == _addr){
                 max_payout += deposits[_i].max_payout;
             }
         }
        uint direct_bonus = msg.value/10;

            if(users[up].isActive == 1 && users[up].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[up].payouts;
            }
             users[up].direct_bonus += direct_bonus; 
             users[up].payouts += direct_bonus; 
             users[up].total_bonus += direct_bonus;

             up.transfer(direct_bonus);

            emit DirectPayout(users[_addr].upline, _addr, direct_bonus);
        }
          admin_fee.transfer(msg.value / 5);
         
    } 

 
     function deposit2(address payable _upline) payable external {
       require(msg.value >= min_deposit,"Low deposit value");
        _setUpline(msg.sender, _upline );
        _deposit(msg.sender, msg.value );
    }

    function redeposit( ) payable external {
         
          require(msg.value >= min_deposit,"Low deposit value");

          _redeposit(msg.sender, msg.value );
    }

 function send_gen_rewards() private {
        address _addr = msg.sender;
        address payable _upline = users[msg.sender].upline;
        uint roi_generated = 0;
        uint no_of_days;
        uint max_payout = 0 ;
         for(uint _i=1; _i <= total_deposit_count; _i++){
             if(deposits[_i].my_address == _addr){
                 max_payout += deposits[_i].max_payout;
             }
         }
   
         for(uint8 _i=1; _i <= total_deposit_count; _i++){
             
             if(deposits[_i].my_address == msg.sender){
                    no_of_days =  (now - deposits[_i].deposit_time)/dailySeconds;

                    if(no_of_days > 250){
                        no_of_days = 250;
                    }
                    roi_generated +=  deposits[_i].deposit_amount * no_of_days * dailyRoi / dailyRate  ;  

             }
          uint net_roi_pay = roi_generated - users[msg.sender].gen_rewards_sent; 
          users[msg.sender].gen_rewards_sent += net_roi_pay;

          for(uint8 i = 0; i < ref_bonuses.length; i++) {
                if(_upline == address(0)) break;

                  if(users[_upline].isActive == 1 && users[_upline].directs >= i + 1){
                      if(users[_upline].payouts + net_roi_pay > max_payout){
                          net_roi_pay = max_payout - users[_upline].payouts;
                      }
                    
                      uint net_payable = net_roi_pay*ref_bonuses[i]/100;
                      _upline.transfer(net_payable);
                      users[_upline].gen_bonus += net_payable;
                      users[_upline].total_bonus += net_payable;
                      users[_upline].payouts += net_payable;

                  }
                _upline = users[_upline].upline; 
            }

      }
    }

 function collect(address payable _addr) public returns (uint) {
 
          uint _maxRec = 0;
        uint _netRoi = 0;
        uint _totalRoi = 0;



         uint max_payout = 0 ;
         for(uint _i=1; _i <= total_deposit_count; _i++){
             if(deposits[_i].my_address == _addr){
                 max_payout += deposits[_i].max_payout;
             }
         }
         users[_addr].roi_payable = 1;
        for(uint i=1; i<= total_deposit_count; i++){
          Deposit storage deposit = deposits[i];
                   users[_addr].roi_payable = 2;

          if(_addr == deposit.my_address && deposit.isActive == 1){
                     users[_addr].roi_payable = 3;

              uint _time = (now - deposit.deposit_time)/dailySeconds;
              uint _depAmount = deposit.deposit_amount;
              _maxRec += deposit.max_payout;
 
            uint  collectProfit = _depAmount * _time * dailyRoi / dailyRate ;
              if(collectProfit >= _maxRec ){
                collectProfit = _maxRec;
                deposit.isActive = 0;
              }

              _totalRoi += collectProfit;
             users[_addr].roi_payable = 4;

          }
        } 
                 users[_addr].roi_payable = 5;

          users[_addr].total_roi = _totalRoi;
          uint _maxRoi = max_payout - users[_addr].payouts;
          uint _roiPaid = users[_addr].payouts - users[_addr].total_bonus;
            _netRoi = _totalRoi - _roiPaid;
          if(_netRoi >= _maxRoi){
            users[_addr].roi_payable = _maxRoi;
          } else {
            users[_addr].roi_payable = _netRoi;
          }
          return users[_addr].roi_payable;
    }

   
     function withdraw2() public payable {
        

     //  users[msg.sender].roi_payable = 1*sunny;
       uint payout = collect(msg.sender);

       // total_withdraw += payout;
       // users[msg.sender].payouts += payout;
       // users[msg.sender].roi_payable = 0;

       // _addr.transfer(payout); 
   }

    // function withdraw() public payable {
      
    //    address payable _addr = msg.sender;
    //    uint amount = 1*sunny;
    //   // collect(_addr);
    //    uint max_payout = 0 ;
    //      for(uint _i=1; _i <= total_deposit_count; _i++){
    //          if(deposits[_i].my_address == _addr){
    //              max_payout += deposits[_i].max_payout;
    //          }
    //      }
      
    //    users[msg.sender].roi_paid += amount;
    //    users[msg.sender].payouts += amount;
    //    msg.sender.transfer(amount);

    //    require(users[msg.sender].payouts < max_payout, "Full payouts");

    //     // Deposit payout

    //     uint net_pay = 0;
    //     uint no_of_days = 0;
    //     uint cum_max_rec = 0;
    //     uint payout = 0;
    //     // 1 days = 10 seconds

    //     if(users[_addr].roi_paid < max_payout) {

    //          for(uint _i=1; _i <= total_deposit_count; _i++){
    //          if(deposits[_i].my_address == _addr && deposits[_i].isActive == 1){
    //                 no_of_days = (block.timestamp - deposits[_i].deposit_time) / 10 ;
    //                 cum_max_rec += deposits[_i].max_payout;
    //                 if(no_of_days > 250){
    //                   no_of_days = 250;
    //                   deposits[_i].isActive = 0;
    //                 } else if(cum_max_rec >= users[_addr].payouts){
    //                   deposits[_i].isActive = 0;
    //                 }
    //                 payout += (deposits[_i].deposit_amount * no_of_days * dailyRoi / dailyRate) ;  
    //          }
    //        }

    //        net_pay = payout - users[_addr].roi_paid;
            
    //         if(users[_addr].roi_paid + net_pay > max_payout) {
    //             net_pay = max_payout - users[_addr].roi_paid;
    //         }
    //         payout = net_pay;
    //     }

    //     if(payout > 0) {
    //         if(users[msg.sender].payouts + payout > max_payout) {
    //             payout = max_payout - users[msg.sender].payouts;
    //         }

    //         users[msg.sender].roi_paid += payout;
    //         users[msg.sender].payouts += payout;

    //      }
      
        
    //     //  // Match payout
    //     // send_gen_rewards();
 
    //     users[msg.sender].payouts += payout;
    //     total_withdraw += payout;

    //     _addr.transfer(payout);

    //     emit Withdraw(msg.sender, payout);

    //     if(users[msg.sender].payouts >= max_payout) {
    //         emit LimitReached(msg.sender, users[msg.sender].payouts);
    //     }
    // } 
    
      

    /*
        Only external call
    */


 function getNow() external view returns  (uint ){  
      return  block.timestamp ;
   }

    
 function checkOwner() external view returns  (address payable){  
      return  owner ;
   }

  
   function changeOwner(address payable _newOwner) external {  
     require(msg.sender == owner,"You are not owner");
         owner = _newOwner;
   }


    function userInfo(address payable _addr) view external returns(address payable upline, uint256 first_deposit_time, uint256 total_deposits, uint256 payouts, uint256 direct_bonus , uint256 gen_bonus) {
        return (users[_addr].upline, users[_addr].first_deposit_time, users[_addr].total_deposits, users[_addr].payouts, users[_addr].direct_bonus , users[_addr].gen_bonus);
    }

    function userInfoTotals(address payable _addr) view external returns(uint256 directs, uint256 total_deposits, uint256 payouts, uint256 total_structure) {
        return (users[_addr].directs, users[_addr].total_deposits, users[_addr].payouts, users[_addr].total_structure);
    }

    function contractInfo() view external returns(uint256 _total_users, uint256 _total_deposited, uint256 _total_withdraw ) {
        return (total_users, total_site_deposits, total_withdraw );
    }

  }