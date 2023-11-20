


// const mongoose = require('mongoose');
// const url = 'mongodb://127.0.0.1:27017/gofoodmern';

// const mongoDB=async()=>{

//      await mongoose.connect(url,{useNewUrlParser:true},async(err,result)=>{
//         if(err) console.log(err)
//         else {
//             console.log( 'successfully connected');
     
// const fetchdata=await mongoose.connection.db.collection('food_items')
//  fetchdata.find({}).toArray=(async(err, data)=>{
//     if(err)console.log(err);
//     else {
//          console.log(data);
    
//     }
// });
//   }

// });
// }


    
//  module.exports =mongoDB;



// // const mongoose = require('mongoose');
// // const url = 'mongodb://127.0.0.1:27017/gofoodmern';


// // const mongoDB = async () => {
// //     try{
// //         await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
// //         console.log('connected successfully');
// //         let fetch_data= mongoose.connection.db.collection('food_items');
// //          fetch_data.find({}).toArray(function(err,data){if(err)console.log(err);
// //                 else {console.log(data)}
// // })
// // }  
// // // }catch(err){
// // //     console.log(err);
// // // }
// // }

// // module.exports= mongoDB







const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/gofoodmern';

const mongoDB =async ()=>{
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
console.log("Connect")
fetchData();
    }
    catch(err){
        console.log("Error connecting to mongodb",err);


    }
};

async  function fetchData() {
    try {
        const fetch_data=  await mongoose.connection.db.collection("food_items");
         fetch_data.find({}).toArray(async function(err, data) {
const foodCategory = await mongoose.connection.db.collection("foodcategory");
foodCategory.find({}).toArray(function(err,catData){
    if (err)console.log(err);
    else{
        global.food_items = data
        global.foodCategory = catData
    }
})

         });


// console.log(data);
//global.food_items = data;
//console.log(global.food_items);

}catch(err) {
    console.log("err fetching data",err);


}
}

module.exports=mongoDB;











// const mongoose = require('mongoose')
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI='mongodb://127.0.0.1:27017/gofoodmern'
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function (callback) {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food-items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 // const categoryCollection = await mongoose.connection.db.collection("Categories");
//                 // categoryCollection.find({}).toArray(async function (err, Catdata) {
//                 //     callback(err, data, Catdata);

//                 //})
//               return(err,data)  
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };