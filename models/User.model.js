const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({

    name: { type: String , require:true },
    email: { type: String , require:true ,  unique: true},
    password: { type: String , require:true},
    roles: {
        type: [String],
        enum: ['Customer', 'Seller', 'Admin'],
        default: ['Customer'], // Default role
      },
    
   

})


module.exports = mongoose.model('User', UserSchema);