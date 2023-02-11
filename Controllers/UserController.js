const db = require('../utils/db');
const { hashPassword, compare } = require('../utils/hashPass');

const checkEmail = async (email, res) => {
    try {
        const check = await db.User.findAll({ where: { email } });
        return check;
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'Email Check Error 2',
        });
        return 'error';
    }
};

const signup = async (req, res) => {
    // console.log(typeof User.findOne);
    const { fullname, email, password } = req.body;
    try {
        const check = await checkEmail(email, res);
        if (check === 'error') return;
        if (check.length !== 0) {
            return res.status(404).json({
                status: 'Email Already in use',
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'Email Check Error 1',
        });
    }
    try {
        const hash = await hashPassword(password);
        const newUser = await db.User.create({
            fullname: fullname,
            email: email,
            password: hash
        });
        console.log(newUser);
        return res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Signup Error'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await checkEmail(email, res);
        if(user.length===0){
            return res.status(404).json({
                status: 'incorrect email'
            });
        }
        const check = await compare(password, user[0].password);
        if(check){
            return res.status(200).json({
                status: 'success, user authenticated'
            });
        }else{
            return res.status(404).json({
                status: 'incorrect password'
            });
        }
    } catch (err) {
        return res.status(404).json({
            status: 'login catch error'
        });
    }
};

const deleteUser = async (req,res) => {
    try{
        const {email} = req.body;
        await db.User.destroy({where:{email}});
        return res.status(200).json({
            status: 'success, user deleted'
        });
    }catch(err){
        return res.status(404).json({
            status: 'deleteUser catch error'
        });
    }
};

const changePassword = async (req,res) => {
    try{
        const {email,oldpass,newpass} = req.body;
        const hashpass = await db.User.findOne({attributes:['password'],where:{email}});
        const check = await compare(oldpass,hashpass.password);
        if(!check){
            return res.status(404).json({
                status: 'Old Password is Incorrect'
            });
        }
        const newhash = await hashPassword(newpass);
        await db.User.update({password:newhash,updatedAt:db.Sequelize.literal("CURRENT_TIMESTAMP")},{where:{email}});
        return res.status(200).json({
            status: 'success, password changed'
        });
    }catch(err){
        console.log(err);
        return res.status(404).json({
            status: 'changePassword catch error'
        });
    }
}

module.exports = { signup, login, deleteUser,changePassword};