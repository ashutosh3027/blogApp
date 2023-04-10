import API from "../utils/axiosConfig";

class FollowService{
    async getFollows(){
        const {data} = await API.get("/follow/follows");
        return data;
    }
    async getFollowings(){
        const {data} = await API.get("/follow/followings");
        return data;
    }
};
export default new FollowService();