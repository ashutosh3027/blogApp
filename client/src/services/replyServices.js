import API from "../utils/axiosConfig";

class ReplyService {
    async get(post_id, comment_id) {
        const { data } = await API.get(`/reply/get?comment_id=${comment_id}&post_id=${post_id}`);
        return data;
    }
    async new(message, comment_id) {
        const { data } = await API.post(`/reply/new`, {
            message, comment_id
        });
        return data;
    }
}

export default new ReplyService();