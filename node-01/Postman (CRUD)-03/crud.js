const express = require('express')
const app = express()

app.use(express.json());

const users = [];


// For Getting the Data
app.get("/user", (req,res) => {
    res.json({
        users : users,
    });
});

// For Creating User or Data
app.post("/user",(req,res) => {
    users.push(req.body);
    res.json({
        msg : "User is Added Successfully !!",
    });
});


// For Getting Single Data
app.get("/user/:user_id", (req,res) => {
    const user_id = Number(req.params["user_id"]);

    if(isNaN(user_id)) {
        return res.json({
            msg : "invalid url",
        });
    } else if (!users[user_id]) {
        return res.json({
            msg : "user is not exist",
        });
    }
    else {
        return res.json({
            user : users[user_id]
        });
    };
});


// For Delete the single data
app.delete("/user/:user_id", (req,res) => {
    const user_id = Number(req.params["user_id"]);

    if(isNaN(user_id)) {
        return res.json({
            msg : "invalid url",
        });
    } else if (!users[user_id]) {
        return res.json({
            msg : "user is not exist",
        });
    }
    else {
        delete users[user_id];
        return res.json({
            msg : "User is Removed Successfully",
        })
    };
});


// For Update tha Data of Single User
app.put("/user/:user_id",(req,res) => {
    const user_id = Number(req.params["user_id"]);

    const user_data = req.body;

    if (isNaN(user_id)) {
        return res.json({
            msg : "Invalid URL",
        });
    } else if (!users[user_id]) {
        return res.json({
            msg : "User is Not Exist",
        });
    } else {
        if (user_data["username"]) {
            users[user_id]["username"] = user_data["username"];
        }

        if (user_data["age"]) {
            users[user_id]["age"] = user_data["age"];
        }

        if (user_data["email"]) {
            users[user_id]["email"] = user_data["email"];
        }

        return res.json({
            msg : "User's Data has been Updated Successfully"
        });
    };
});


app.listen(8000)