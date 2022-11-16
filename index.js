const express = require('express');
const axios = require("axios");
const app = express();
const cors = require("cors");
const { mercadopago } = require("./mercadopago/index")
app.use(cors());
app.use(express.json());

app.post("/mercadopago", async (req, res)=>{
   const {order:{items,infoShipping,buyer}} = req.body;
   const preference = {
      items: items.map((item)=>{
         console.log(item)
         return {
            title: item.ref,
            description: item.brand,
            picture_url: item.image,
            category_id: item.gender,
            quantity: item.quantity,
            currency_id: "COP",
            unit_price: item.totalPrice
         }
      })
      
      
   }
   console.log(preference)

   try {
      const mercadoResponse = await mercadopago.preferences.create(preference);
      console.log(mercadoResponse)
      res.status(200).json({openWindow:mercadoResponse.body.init_point})
   } catch (error) {
      console.log(error);
      res.status(400);
   }

})

app.post("/ipn", async (req, res)=>{
   console.log(req)
   const { id,topic } = req.query;
   if(id !== 123456){
      const { data } = await axios.post(`https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${id}`,{
         headers: {
           'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
         }
       })
       console.log(data)
   }
      
      return  res.status(200).send("OK");



})

app.listen(5000,()=>{console.log("server started on port 5000")}) 