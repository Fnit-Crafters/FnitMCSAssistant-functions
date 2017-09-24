const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.statistics = functions.https.onRequest((req, res) => {

  const uuid = req.body.uuid
  const name = req.body.name
  const isOnline = req.body.isOnline
  const statistics = req.body.statistics

  if (!(uuid != null && name != null && isOnline != null)) {
    // invalid params
    res.send("{status: false}")
  }

  var db = admin.database();

  var userRef = db.ref("/users").child(uuid)
  userRef.set({
    uuid: uuid,
    name: name,
    isOnline: isOnline
  })

  var statisticsRef = db.ref("/statistics").child(uuid) 
  statisticsRef.set(statistics)

  res.send("{status: true}")
});
