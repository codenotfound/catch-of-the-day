import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCb0Sue02ygPFtDx45qkwRTSbcxsU_ybbc",
  authDomain: "catch-of-the-day-wes-bos-643fd.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-wes-bos-643fd.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export {firebaseApp};

// This is a default export
export default base;
