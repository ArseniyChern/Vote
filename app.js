

  const express = require('express')
  const mongo = require('mongodb')

  const server = express()
  const db = mongo.MongoClient

  server.set('view engine','ejs')
  server.use(express.static(__dirname+'/views'))

  db.connect('mongodb://localhost:27017',(err,client) => {
    const database = client.db('votes')

    let tasks = []
    let voted = []

    server.get('/',(req,res) => {
            res.render('index.ejs')
    })

    server.post('/vote',(req,res) => {
        console.log(req.query.secret)
        if(!voted.includes(req.query.secret)) {
            database.collection('votes').insert({vote:req.query.vote},(err,result) => {
                if(err) res.send({status:'error',error:'Error inserting into database'})

                tasks.unshift(req.query.vote)
                res.send({status:'Success',message:'Successfully voted'})
                voted.unshift(req.query.secret)

            })
        } else {
            res.send({status:'error',error:'Already Voted'})
        }
    })
  })




module.exports = server;
