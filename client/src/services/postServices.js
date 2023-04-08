import API from "../utils/axiosConfig";

class PostService{
    async newPost(title, body){
        const data = await API.post("/post/new",{
            title,
            body
        });
        return data;
    }
    async editPost(id, body){
        const data = await API.put("/post/edit",{
            id,
            body
        });
        return data;
    }
    async getPosts(){
        const {data} = await API.get("/post/get");
        return data;
    }
    async getPost(id){
        const {data} = await API.get(`/post/get/${id}`);
        return data
    }
    async deletePost(id){
        const data = await API.delete(`/post/delete/${id}`);
        return data;
    }
};

export default new PostService();