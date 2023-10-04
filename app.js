const express = require('express')
const app = express()
const lData = require('./leaderData.json')
const gData = require('./groupData.json')
const { response } = require('express')
const fs = require('fs')

const path = require('path')


app.use(express.static('client'))
app.use(express.json({ limit: '50mb' }))


app.get('/group', function (req, resp) {
  resp.send(gData)
})

app.get('/display/:gID', function (req, resp) {
  group = req.params.gID
  data = lData.filter(d => d.groupID == group)

  resp.send(data)
})

app.post('/newLeader', function (req, resp) {
  const data = req.body
  console.log(data)
  lData.push(data)
  fs.writeFileSync('./leaderData.json', JSON.stringify(lData))
  resp.json(data)
})

app.post('/newGroup', function (req, resp) {
  const { name } = req.body
  console.log(gData)
  const ID = gData[gData.length - 1].groupID + 1
  console.log(ID)
  gData.push({ groupID: ID, GroupName: name })
  fs.writeFileSync('./groupData.json', JSON.stringify(gData))
  resp.json({ groupID: ID, GroupName: name })
})

module.exports = app
