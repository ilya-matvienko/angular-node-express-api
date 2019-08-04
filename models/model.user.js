class UserModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.uid = null;
    }
}

module.exports = UserModel;
