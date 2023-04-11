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
    async getFollowsById(id){
        const {data} = await API.get(`/follow/follows/${id}`);
        return data;
    }
    async getFollowingsByID(id){
        const {data} = await API.get(`/follow/followings/${id}`);
        return data;
    }
    async follow(id){
        const {data} = await API.post('/follow/new',{
            user_id_following: id
        });
        return data;
    }
    async unfollow(id){
        const {data} = await API.delete(`/follow/unfollow/${id}`);
        return data;
    }
};
export default new FollowService();