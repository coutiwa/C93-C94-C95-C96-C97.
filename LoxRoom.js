const firebaseConfig = {
  apiKey: "AIzaSyBixR_3y1scGoQasAnvl56eYLDdONeHoqQ",
  authDomain: "loxsocial.firebaseapp.com",
  projectId: "loxsocial",
  storageBucket: "loxsocial.appspot.com",
  messagingSenderId: "361925277204",
  appId: "1:361925277204:web:2e4e371c9058403065d901"
};

firebase.inicializeApp(firebaseConfig);

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala"
  });
  localStorage.setItem("roomName", roomName);

  window.location = "LoxPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "LoxPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}