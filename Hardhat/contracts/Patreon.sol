// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Patreon {
    mapping(address => uint256) public level;       // a mapping that stores levels of each owner
    mapping(uint256 => uint256) public perlevel;    // a mapping to maintain number of people at a given level
    address public i_owner;
         
    
    constructor() {
        i_owner = msg.sender;
    }

    function fund(uint curr, uint latest) public payable {
         require(msg.sender != i_owner);                        
         if(curr == 0){                                         // User has not taken membership of any level and is now taking membership, it can be any level(1,2,3)
            perlevel[latest] = perlevel[latest]+1;
            level[msg.sender] = latest;
        }else if(curr == 1){                                    // User wants to upgrade his/her membership to either level 2 or 3 from level 1
            perlevel[1] = perlevel[1]-1;                        
            perlevel[latest] = perlevel[latest]+1;
            level[msg.sender] = latest;
        }else if(curr == 2){                                    // User wants to upgrade to level 3 from level 2
            perlevel[2] = perlevel[2]-1;
            perlevel[latest] = perlevel[latest]+1;
            level[msg.sender] = latest;
        }
    }


    
    modifier onlyOwner {
         require(msg.sender == i_owner);
        _;
    }

    function bal() public view returns(uint){                       // returns balance  
        return address(this).balance;
    }

    function getlevel(address addr) public view returns(uint){      // return level of any user
        return level[addr];
    }

    function getalpha() public view returns(uint){                  // users with level 1
        return perlevel[1];
    }

    function getbeta() public view returns(uint){                   // users with level 1
        return perlevel[2];
    }

    function getgamma() public view returns(uint){                  // users with level 1
        return perlevel[3];
    }
    
    function withdraw() public onlyOwner {                          // withdraw funds
         uint balance = bal();
         payable(i_owner).transfer(balance);
    }

}