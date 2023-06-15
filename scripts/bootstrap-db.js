const admin = require('firebase-admin');

const app = admin.initializeApp({
  projectId: 'foo',
  credential: admin.credential.applicationDefault(),
  databaseURL: 'http://firebase:8080'
});

const db = app.firestore();
db.settings({
  host: 'firebase:8080',
  ssl: false
});

const auth = app.auth();

async function bootstrap() {
  // create example document
  db.collection('documents').doc('example').set({
    title: 'Example Document',
    content: 'This is an example document.',
    author: 'XXXXXXXX',
  });
  const userRecord = await auth.createUser({
    email: 'admin@admin.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: '123456',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  });
  console.log(`Created user: ${JSON.stringify(userRecord)}`);
}

bootstrap();