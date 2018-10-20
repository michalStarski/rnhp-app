API_URL = 'http://dry-fjord-64564.herokuapp.com/api/v1';
const axios = require('axios');

class MessageService {
    static async getAll() {
        return (await axios.get(`http://dry-fjord-64564.herokuapp.com/api/v1/messages/`)).data;
    }

    static async create(content, author, image = "") {
        return (await axios.post(`${API_URL}/messages/`, {
            content, author, image
        })).data;
    }

    static async like(id, author) {
        return (await axios.post(`${API_URL}/messages/${id}/like`), {
            author: author
        })
    }
}

module.exports = MessageService;
