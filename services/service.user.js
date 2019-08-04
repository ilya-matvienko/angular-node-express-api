const UserModel = require("../models/model.user");
let Validator = require('fastest-validator');

let users = {};
let counter = 0;

let userValidator = new Validator();

// Необходимо использовать такие же шаблоны проверки как и на клиенте
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

// Схема клиентского валидатора
const userVSchema = {
    guid: {type: "string", min: 3},

    email: { type: "email", max: 75 },
    password: { type: "string", min: 2, max: 50, pattern: passwordPattern},
};

class UserService {
    static create(data) {
        const vres = userValidator.validate(data, userVSchema);
        let user = new UserModel(data.email, data.password);

        if(!vres) {
            let errors = {}, item;

            for(const index in vres) {
                item = vres[index];
                errors[item.field] = item.message;
            }

            throw {
                name: "ValidationError",
                message: errors
            };
        }

        user.uid = 'c' + counter++;
        users[user.uid] = user;

        return user;
    }

    static retrieve(uid) {
        if(users[uid]) {
            return users[uid];
        } else {
            throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
        }
    }

    static update(uid, data) {
        if(users[uid]) {
            const user = users[uid];
            Object.assign(user, data);
        } else {
            throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
        }
    }

    static delete(uid) {
        if(users[uid]) {
            delete users[uid];
        } else {
            throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
        }
    }
}

module.exports = UserService;
