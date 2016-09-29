# API Mockuper

A aplication that serve the logic to manage the design of a software development


## Requirements
* node js 6
* sails js 0.12.4
* MongoDB version: 2.6.5

## Installation

* 1.  npm install
* 2.  mkdir data
* 3.  mongod --dbpath=data
* 4.  mongo
      db.createUser({
        user: "accountUser",
        pwd: "password",
        roles: [ 
          "readWrite", 
          "dbAdmin" 
        ]
      })
* 5. mongo
db.permission.insert( { can: "edit" } )
      db.permission.insert( { can: "view" } )


## Run
* sails lift
* http://localhost:1337/

