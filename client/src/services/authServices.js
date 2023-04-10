import API from "../utils/axiosConfig";

class AuthService{
    async login(email, password){
        const data = await API.post("/user/login",{
            email,
            password
        });
        return data;
    }
    async logout(){
        await API.post("/user/logout");
        return;
    }
    async signup(fullname, email, password){
        const data = await API.post("/user/newuser",{
            fullname,
            email,
            password
        });
        return data;
    }
    async getUser(){
        const {data} = await API.get("/user/");
        return data;
    }
};
export default new AuthService();