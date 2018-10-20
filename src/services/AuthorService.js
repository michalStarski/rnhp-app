const { AsyncStorage } = require('react-native');

class AuthorService {
    static async getName() {
        return AsyncStorage.getItem('author_name');
    }

    static async setName(name: string) {
        return AsyncStorage.setItem('author_name', name);
    }
}

module.exports = AuthorService;
