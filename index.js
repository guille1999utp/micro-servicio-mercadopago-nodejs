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

   try {
      const mercadoResponse = await mercadopago.preferences.create(preference);
      console.log(mercadoResponse)
      res.status(200).json({openWindow:mercadoResponse.body.init_point})
   } catch (error) {
      console.log(error);
      res.status(400);
   }

})

app.post("/webhooks", async (req, res)=>{
   console.log(req.body)
   const { data: { id },type } = req.body;
   try {
      if(id !== "123456789" && type === "payment"){
         const { data } = await axios.post(`https://api.mercadopago.com/v1/payments/${id}`,{
            headers: {
              'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
            }
          })
          console.log(data)
      }
   } catch (error) {
    console.log(error)  
   }
  
      
      return  res.status(200).send("OK");



})

app.listen(5000,()=>{console.log("server started on port 5000")}) 