# API Mockuper

A aplication that serve the logic to manage the design of a software development


## Requirements
* node js 6
* sails js 0.12.4

## Installation

  1.  npm install
  2.  mkdir data
  3.  mongod --dbpath=data
  4.  mongo
      db.createUser({
        user: "accountUser",
        pwd: "password",
        roles: [ 
          "readWrite", 
          "dbAdmin" 
        ]
      })
  5. sails lift

