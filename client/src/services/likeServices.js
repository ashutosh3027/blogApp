import API from "../utils/axiosConfig";

class LikeService {
    async like(post_id) {
        const { data } = await API.post('/likes/new', {
            post_id
        });
        return data;
    }
    async unlike(post_id) {
        const { data } = await API.delete(`/likes/delete/${post_id}`);
        return data;
    }
}

export default new LikeService();