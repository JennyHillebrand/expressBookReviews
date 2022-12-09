const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const userName = req.query.userName;
  const password = req.query.password;
  if (!userName || userName==""){
      res.send("Please provide a User Name");}
  else if (userName in users){
      res.send("User already exists. Please log in");}
  else if (!password || password==""){
      res.send("Please provide a password");}
  // all looks good
  users.push({"userName":userName,"password":password});
  res.send("The user" + (' ')+ (req.query.userName) + " has been added!")
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  res.send(books[isbn])
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  
  filtered_books={};
  for (book in books){
       if (books[book]["author"]===author){
           filtered_books[book]=books[book];
          }
      }
  // return res.status(300).json({message: "Yet to be implemented"});
  res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  
  filtered_books={};
  for (book in books){
       if (books[book]["title"]===title){
           filtered_books[book]=books[book];
          }
      }
  // return res.status(300).json({message: "Yet to be implemented"});
  res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  res.send(books[isbn]["review"])
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
