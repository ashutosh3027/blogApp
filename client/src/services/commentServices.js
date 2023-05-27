import API from "../utils/axiosConfig";

class CommentService{
    async newComment (message,post_id){
        const {data} = await API.post('/comment/new',{
            message,post_id
        });
        return data;
    }
    async get (post_id){
        const {data} = await API.get(`/comment/get/${post_id}`);
        return data;
    }
}

export default new CommentService();