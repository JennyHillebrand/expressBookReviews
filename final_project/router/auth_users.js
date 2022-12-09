const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    if (!username || username=="") {return False}
    else {return True}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let filtered_users = users.filter((user) => user.userName === username);
    if (filtered_users.length > 0) {
        let filtered_user= filtered_users[0];
        if (filtered_user.password==password) return True;
    }
    else return False
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const userName = req.query.userName;
  const password = req.query.password;
  if (isValid(userName) && authenticatedUser(userName, password)){
    let accessToken = jwt.sign({
        data: userName
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken
    }
  

  return res.status(200).send("User successfully logged in");
  }
    else return res.status(403).json({message: "User not logged in"})
  

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
