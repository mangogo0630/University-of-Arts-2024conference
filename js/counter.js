const firebaseConfig = {
    apiKey: "AIzaSyCbfbU8sklU3fhARjcjY5_QDZdU2M0uCgc",
    authDomain: "conference-2022-a89f3.firebaseapp.com",
    projectId: "conference-2022-a89f3",
    storageBucket: "conference-2022-a89f3.appspot.com",
    messagingSenderId: "682428152124",
    appId: "1:682428152124:web:86e3223a573689d4008639",
    measurementId: "G-N6J465DEV5",
    databaseURL: "https://conference-2022-a89f3-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
const hitCounter = document.getElementById("hit-counter");
hitCounter.style.display = "none";
const db = firebase.database().ref("totalHits");
db.on("value", (snapshot) => {
  hitCounter.textContent = snapshot.val();  
  hitCounter.textContent =String(snapshot.val()).padStart(7, '0');
});


  const userCookieName = "returningVisitor";
checkUserCookie(userCookieName);

function checkUserCookie(userCookieName) {
  const regEx = new RegExp(userCookieName, "g");
  const cookieExists = document.cookie.match(regEx);
  if (cookieExists != null) {
    hitCounter.style.display = "block";
  } else {
    createUserCookie(userCookieName);
    db.transaction(
      (totalHits) => totalHits + 1,
      (error) => {
        if (error) {
          console.log(error);
        } else {
          hitCounter.style.display = "block";
        }
      }
    );
  }
}

function createUserCookie(userCookieName) {
  const userCookieValue = "Yes";
  const userCookieDays = 7;
  let expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + userCookieDays);
  document.cookie =
    userCookieName +
    "=" +
    userCookieValue +
    "; expires=" +
    expiryDate.toGMTString() +
    "path=/";
}