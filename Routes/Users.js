const express = require("express")
const UserModel = require("../models/User.model")
const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
const router = express.Router();

require('dotenv').config();

router.post('/CreateUser', async (req, res) => {

    const { name, email, password  } = req.body;

    if (!name || !email || !password ) {
        return res.status(400).json({ message: "Please fill all the value" })
    }

    try {

        const emailCheck = await UserModel.findOne({ email })
        if (emailCheck) {
            return res.status(400).json({ message: "Email is already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const hasspass = await bcrypt.hash(password, salt)

        const User = await UserModel({ name, email, password: hasspass });

        await User.save();

        const payload = {
            UserId: {
                id: User._id,
            
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        // console.log(token)
        res.status(200).json({ message: "user create the successfully" })

    } catch (error) {
        console.error(error)

        res.status(500).json({ message: "Internal Server Error" })

    }


})


router.get("/getUser/:Id", async (req, res) => {

    const userId = req.params.Id;
    if (!userId) {
        return res.status(400).json({ message: "User Id is required!" })
    }

    try {

        const User = await UserModel.findOne({ _id: userId });

        if (!User) {
            return res.status(404).json({ message: 'User details not fetched' })
        }

        res.status(200).json({ message: "User details ", User })



    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" });

    }

})


router.put("/updateUser/:Id", async (req, res) => {

    const { name, email, password } = req.body;
    const userId = req.params.Id;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the value" })
    }
    if (!userId) {
        return res.status(400).json({ message: "User Id is required!" })
    }

    try {

        const hashpass = await bcrypt.hash(password, 10);
        const updateUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { name, email, password: hashpass } },
            { new: true }
        );

        if (!updateUser) {
            return res.status(400).json({ message: "User data not update" })
        }

        res.status(200).json({ message: "User data updated successfully ", updateUser })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server Error" })
    }
})


router.delete("/DeleteUser/:Id", async (req, res) => {
    const UserId = req.params.Id;

    if (!UserId) {
        return res.status(400).json({ message: "User Id is required!" })
    }
    try {
        const DeleteUser = await UserModel.findOneAndDelete({ _id: UserId });
        if (!DeleteUser) {
            return res.status(400).json({ message: "User not deleted" })
        }

        res.status(200).json({ message: "User delete successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})



// user login route 

router.post('/login', async(req, res)=>{
    const{ email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Provide both email and password"
        })
    }


    try {

        const user = await UserModel.findOne({email})

       if(!user){
        return res.status(400).json({message:"Invaid email or password1"})
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return res.status(400).json({message:"Invalid email or password2"})
       }

       return res.status(200).json({message:"Login successfuly"})

        
    } catch (error) {
        
    }
})



module.exports = router;