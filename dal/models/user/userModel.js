const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    };
const UserSchema = new Schema ({
        name: { type: String, required: true },
        id: { type: String, required: true, unique: true},
        password: {type: String, required: true},
        dob: {type: Date, required: true},
        gender: {type: String, required: true},
        email: { 
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                required: 'Email address is required',
                validate: [validateEmail, 'Please fill a valid email address'],
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }
});

module.exports = mongoose.model('user', UserSchema);