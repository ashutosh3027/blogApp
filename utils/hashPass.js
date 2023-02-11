const bcrypt = require('bcrypt');

const hashPassword = async(password)=>{
    const hash = await bcrypt.hash(password,10);
    return hash;
};

const compare = async(password,hash)=>{
    return await bcrypt.compare(password,hash);
};

module.exports = {hashPassword,compare};