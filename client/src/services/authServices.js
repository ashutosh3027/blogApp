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
    async changePassword(oldpass,newpass){
        const {data} = await API.put("/user/changepassword",{
            oldpass,
            newpass
        });
        return data;
    }
    async deleteAccount(password){
        const {data} = await API.delete(`/user/delete/${password}`);
        return data;
    }
    async getUserById(id){
        const {data} = await API.get(`/user/get/${id}`);
        return data;
    }
    async getUsers(name,page=1){
        const {data} = await API.get(`/user/search?name=${name}&page=${page}`);
        return data;
    }
};
export default new AuthService();