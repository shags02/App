const express = require("express");
const router = express.Router();

const Order = require("../models/Orders")

router.post('/orderData', async(req,res) => {
    let data = req.body.order_data
     data?.splice(0,0, { order_date : req.body.order_date})

    let eId = await Order.findOne({'email': req.body.email})
    console.log('eid---------------',eId)
    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data : [data]
            }).then(() => {
                res.json({success:true})
            })
        }
        catch(error){
            console.log(error.message)
            res.send("ERR")
        }
    }
    else{
        try{
            console.log("others ------------------------------", data);
            await Order.findOneAndUpdate({ email: req.body.email},
                {order_data:data}).then(() => {
                    console.log('eeeeeeeeeeeeeeeee---',req.body.email);
                    return res.json({ success: true })
                })  
        } 
        catch(error){
            res.send("ERROER")
        }
    }

})


router.post('/myorderData', async(req,res) => {
    try{
        let myData = await Order.findOne({ 'email':req.body.email})
        console.log("od-----------------",JSON.stringify(myData));
        res.json( {orderData:myData})
    }   
    catch(error){
        res.send("ERROER")
    } 
})

module.exports = router;
