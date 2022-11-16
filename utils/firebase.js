//IMPORTAMOS FUNCIONES NECESARIAS DE LOS SDK QUE UTILIZAREMOS
const { initializeApp } = require("firebase/app");
//IMPORTAMOS EL METODO QUE PERMITE LA CONEXION CON LA BASE DE DATOS CREADA EN FIRESTORE
const {getFirestore} = require("firebase/firestore");

//CONFIGURACION DE FIREBASE
const firebaseConfig = {
   apiKey: "AIzaSyBsBY4lzzJyveaX-Bh2EiMDWWMEY-tAo1M",
   authDomain: "fragment-bf1c8.firebaseapp.com",
   projectId: "fragment-bf1c8",
   storageBucket: "fragment-bf1c8.appspot.com",
   messagingSenderId: "778680760365",
   appId: "1:778680760365:web:1a9ec7d67344a05b7060a4",
   measurementId: "G-B4ED9Y1NE5"
 };

 //INICIALIZAMOS LA CONEXION DE FIREBASE CON REACT
 const app = initializeApp(firebaseConfig);

 //LE PASAMOS AL METODO getFirestore la variable con la inicializacion de conexion
 //NOS RETORNA LA CONEXION A LA BASE DE DATOS Y LA EXPORTAMOS PARA ACCEDER A LA INFORMACION DESDE OTROS COMPONENTES

 module.exports= {
  database:getFirestore(app)
}