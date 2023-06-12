const express = require("express");
const router = express.Router();

router.post('/foodData', (req,res) => {
    try{
        console.log(global.MenuList)
        res.send([global.MenuList,global.foodCategory])
    }
    catch (error){
        console.error(error.message)
        res.send("Ser error")
    }
})

module.exports = router;