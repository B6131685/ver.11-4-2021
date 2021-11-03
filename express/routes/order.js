const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
var Schema = require('mongoose').Schema;

const orderSchema = Schema({
    order:String,
},{
    collection: 'orders'
})

let Order
try {
    Order = mongoose.model('orders')
} catch(err) {
    Order = mongoose.model('orders', orderSchema);
}


const addProducts = (productData) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Order(
             productData
        );
        new_product.save(
            (err, data)=>{
                if(err){
                    reject(new Error('Cannot insert order to DB'));
                }else{
                    resolve({message: 'Order added successfully'});
                }
            }
        );
    });
}


router.route('/addorder').post((req, res)=>{
    console.log('addorder');
    addProducts(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})

module.exports = router