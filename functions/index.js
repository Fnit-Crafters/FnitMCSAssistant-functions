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
    return
  }

  var db = admin.firestore();

  const userRef = db.collection('users').doc(uuid);
  const setUser = userRef.set({
    uuid: uuid,
    name: name,
    isOnline: isOnline,
    lastLogin: new Date()
  })

  var statisticsRef = db.collection('statistics').doc(uuid);
  statisticsRef.set(statistics)

  res.send("{status: true}")
});
