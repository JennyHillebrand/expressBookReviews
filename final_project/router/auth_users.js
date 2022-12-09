const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    if (!username || username=="") {return false}
    else {return true}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let filtered_users = users.filter((user) => user.userName === username);
    if (filtered_users.length > 0) {
        let filtered_user= filtered_users[0];
        if (filtered_user.password==password) return true;
    }
    else return false
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
  const isbn=req.params.isbn;
  const review=req.query.review;
  const username=req.user["data"];
  // console.log("here ", username)
  if (!(isbn in books)){
      return res.status(300).json({message: "No such ISBN"})
  }
  else {
      books[isbn]["reviews"][username]=review
      return res.status(200).json({message:"Review added successfully " + isbn +" " + review})
  }

  // return res.status(300).json({message: "Yet to be implemented"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn=req.params.isbn;
  const username=req.user["data"];
  // console.log("here ", username)
  if (!(isbn in books)){
      return res.status(300).json({message: "No such ISBN"});
  }
  else {
      newreviews={}
      for (review in books[isbn]["reviews"]){
        if (review[0] != username){
            newreviews[review[0]]=review[1]}

      }
      books[isbn]["reviews"]=newreviews
      //books[isbn]["reviews"] = books[isbn]["reviews"].filter((user) => user[0] != username);
      res.send("Reviews for ISBN ", isbn, " user ", username, " deleted");
      //books[isbn]["reviews"][username]=review
      //return res.status(200).json({message:"Review added successfully " + isbn +" " + review})

  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
