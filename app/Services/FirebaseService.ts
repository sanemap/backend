import * as admin from 'firebase-admin';

const serviceAccount = require('../../firebase.json')

export class FirebaseService {
  // create method to initialize firebase app
  static auth() : admin.auth.Auth {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    return admin.auth()
  }
}
