// let constants = {
//     PORT_NUMBER: 3201,
//     MONGODB:{
//         CONNECTION :{
//             URL:{
//                 LOCALHHOST:"mongodb://localhost:27017/",
//             }
//         },
//         DBNAME:{
//             TESTDB:{
//                 name:'testdb',
//                 usercollection :'users'
//             },
//             ECOMMERCE:{
//                 name:'ecommercedb',
//                 ecommercecollection :'ecommercedb'
//             }
//         },
//         MESSAGE :{
//             SUCCESS :"Connected to MongoDB via Mongoose export",
//             ERROR :"Error connecting to MongoDB: "
//         }
//     }
// }; mongodb://localhost:27017/ecommercedb
// module.exports =   Object.freeze(constants); // freeze prevents changes by users
//module.exports = constants; //

export const Constants = {
    DATABASE_CONNECTION: {
      URL:'mongodb://localhost:27017/',
      DB_NAME:'ecommercedb',
    },
    ORIGIN_URL:{ //Allowing All Origins 
        MERCHANTS_3000:'http://localhost:3000',
        MERCHANTS_3002:'http://localhost:3002'  

    },
    SERVER: {
        ALLOWED_METHOD :'GET,HEAD,PUT,PATCH,POST,DELETE',
        RUNNING_PORT:3001
    },
    JWT_SECRET: 'mySuperSecretKey',
    API_URL: 'https://api.example.com/v1',
  };


