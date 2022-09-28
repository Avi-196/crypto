// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface ERC20{
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint);
    function totalSupply()external view returns (uint256);
    function balanceOf(address _owner)external view returns (uint256 balance);
    function transfer(address _to, uint256 _value)external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
    function approve(address _spender, uint256 _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}


contract ImpactionalCoin is ERC20 {
       string _name;
       string _symbol;
       uint8 _decimals;
       uint _totalSupply;
       address payable public owner;

       mapping( address => uint ) balances;

       mapping( address => mapping( address => uint)) public allowances;

       constructor(){
              _name = "ImpactionalCoin";
              _symbol  =  "IG";
              _decimals = 1;
              _totalSupply = 100000000;
              owner = payable(msg.sender);
              balances[msg.sender] = _totalSupply;
       }

       function name() public view override returns(string memory){
               return _name;
       }
       function symbol() public view override returns (string memory){
                 return _symbol;
    }
       function decimals() public view override returns (uint){
        return _decimals;
    }

       function totalSupply()public view override returns (uint256){
             return _totalSupply;
       }

        function balanceOf(address _owner)public view override returns (uint256 balance){
                 return balances[_owner];
        }

        function transfer(address _to, uint256 _value)public override returns (bool success){
                 require(balances[msg.sender] >= _value , "Insufficient Tokens...");

                 balances[msg.sender] -= _value;
                 balances[_to] += _value;
                     
                 emit Transfer(msg.sender, _to,  _value);

                 return true;
        }




        function allowance(address _owner, address _spender) public view override returns  (uint256 remaining){
                   return allowances[_owner][_spender];
        }

            function approve(address _spender, uint256 _value) public override returns (bool success){
                       require(balances[msg.sender] >= _value , "Insufficient tokens.");
                       require( _value > 0);


                       allowances[msg.sender][_spender] = _value;
                      emit  Approval(msg.sender ,   _spender,  _value);
                      return true;
             }




               function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success){
                        require(allowances[_from][_to] >= _value , "You have insufficient tokens...");
                        require( _value > 0 );
              
                    balances[_from] -= _value;
                    balances[_to] += _value;
                    allowances[_from][_to] -= _value;

                   emit Transfer(_from , _to , _value);

                   return true;
 
                }

                function buyToken() external payable {
                require( (msg.value >= 1 wei) && (msg.value % 1 wei == 0) , "Amount is not equal to 1 wei or in decimal");
                balances[owner] -= msg.value / 1 wei;
                balances[msg.sender] += msg.value / 1 wei;
    }

         function contractBalance() public view returns(uint){
        return address(this).balance;
    }


       function redeem() external payable {
        require(msg.sender == owner, "Only Owner can redeem the Balance");

        owner.transfer(contractBalance());
    }







       




}
