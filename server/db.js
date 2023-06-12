const mongoose = require("mongoose");

const url = "mongodb+srv://gofood:gofood@menu.otm5yfb.mongodb.net/test";

const connectdb = async() => {
 await mongoose.connect(url, {useNewUrlParser:true}, async(err,res) => {
  if(err) console.log("err",err)
  else{
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("MenuList")
    fetched_data.find({}).toArray( async function( err,data){
      const foodCategory = await mongoose.connection.db.collection("MenuCategory")
      foodCategory.find({}).toArray(function (err,catData) {
        if(err) console.log(err);
        else{
          global.MenuList = data;
          global.foodCategory = catData;
        }
      })
      // if(err) console.log(err);
      // else{
      //   global.MenuList = data;
      //   console.log(global.MenuList);
      // }
    })

  }
  });
};

module.exports = connectdb;