#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. ' +
  'Specified database as argument - e.g.: ' + 
  'node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Blog = require("./models/blogs");
const User = require("./models/user");

const genPassword = require('./passport').genPassword

const blogs = [];
const users = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser();
  await createBlog();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function blogCreate(user, title, message, comment) {
  const blog = new Blog({ 
    user: user,
    date: new Date(),
    title: title,
    message: message,
    comment: comment,
    });
  await blog.save();
  blogs.push(blog);
  console.log(`Added Blog: ${blog}`);
}
async function userCreate(username,password,isBlogger){

  const hashSalt = genPassword(password)
  const user = new User({
      username: username,
      password: hashSalt.hash,
      salt: hashSalt.salt,
      blogger: isBlogger,
     })
    await user.save();
    users.push(user);
    console.log(`Added User: ${user}`);
}

// user: {type: Schema.Types.ObjectId, ref: "User"},  
// date: {type: Date},
// message: {type: String},
// comment: {type: Array},

async function createBlog() {
  console.log("Adding blog");
  await Promise.all([
    blogCreate(users[1], "The Odin Project", "A great way to learn programming. You can learn to use CSS, HTML, React with multiple projects coming out of the lessons. They also dive into data structures and algorithms as well as express. It is by no means a lacking curiculum, providing with you a vast amount of knowledge and support to help students reach their goals."),
    blogCreate(users[1], "Valorant", "A FPS game that some say is a unique understanding and mashing of two popular games. Firstly, CSGO, it implements the FPS gameplay really well, having smokes, flashes, spray control, and other mechanics that players use to win rounds. Where it differs is in allowing for Champions like in League, with a variety of different skills that each agent can have. This allows for constant changing metas in the gameplay and constant interest as the game never truly stops evolving.")
  ]);
}
async function createUser() {
  console.log("Adding blog");
  await Promise.all([
   await userCreate('jason','password',false),
   await userCreate('jason2','password',true),
  ]);
}