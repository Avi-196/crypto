const len = 32;
const csprng = require('secure-random');
module.exports = {
    generatePrivateKey() {
        const address = ab2hexstring(csprng(len));
        return address;
    },
}



function ab2hexstring() {
    let arr = ["A","S","D","F","G","H","J","K","L","Q","W","E","R","T","Y","U","I","O","P","Z","X","C","V","B","N","M","8","7","4","5","6","0","1","3","2","9"];
    let result = ""
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i].toString(16);
        str = str.length === 0 ? "00" : str.length === 1 ? str : str
        result += str
    }
    return result
}
