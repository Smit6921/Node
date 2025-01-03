const {User} = require("../models/users");
const jwt = require("jsonwebtoken");

// For getting data

const getUsers = async (req,res) => {

    const allUsers = await User.find();

    res.status(200).json({
        users : allUsers,
    });
}

// For getting single data

const getUser = async (req,res) => {
    const user_id = req.params["user_id"];

    const singleUser = await User.findOne({ _id: user_id});

    if (!singleUser) {
        return res.status(404).json({
            msg : "user is not exist",
        });
    }
    else {
        return res.status(200).json({
            user : singleUser,
        });
    };
}

// For create user

const createUser = async (req, res) => {
    try {
        const {username , password, ...userData} = req.body;

        await User.create({ username: username, password: password});

        res.status(201).json({
            msg:"user added",
        });
    } catch (error) {
        res.status(500).json({
            msg:"intrnal server error",
            error:error,
        });
    }
};

// For update user

const updateUser = async (req,res) => {
    const user_id = req.params["user_id"];

    const user_data = req.body;

    const singleUser = await User.findOne({ _id: user_id});

    if (!singleUser) {
        return res.status(404).json({
            msg : "User is Not Exist",
        });
    } else {
        if (user_data["username"]) {
            singleUser["username"] = user_data["username"];
        }

        if (user_data["password"]) {
            singleUser["password"] = user_data["password"];
        }

        if (user_data["age"]) {
            singleUser["age"] = user_data["age"];
        }

        singleUser.save();

        return res.status(202).json({
            msg : "User's Data has been Updated Successfully"
        });
    };
}

// For delete data

const deleteUser = async (req,res) => {

    const user_id = req.params["user_id"];

    const singleUser = await User.findById(user_id);

    if (!singleUser) {
        return res.status(404).json({
            msg : "user is not exist",
        });
    }
    else {
        await User.deleteOne({ _id: user_id});
        return res.status(202).json({
            msg : "User is Removed Successfully",
        });
    };
};


const loginUser = async (req,res) => {
    const {username,password} = req.body;

    if(!username) return res.json({msg: "Please Enter UserName"});

    if(!password) return res.json({msg: "Please Enter Password"});

    const user = await User.findOne({username});

    if(!user) return res.json({msg: "User not Found"});

    if(user.password !== password) return res.json ({msg: "Password is wrong"});


    // Auth Token : [Example] - afdgafdgg145sg4weg44qe54ga54fa5g4sg4dgdsget0ef0ddf

    const token = jwt.sign({ data: user._id, user: user.username}, "privateKey");

    res.json({
        token: token,
        msg: "User Logged in Successfully",
    });
};


module.exports = {
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser,
}