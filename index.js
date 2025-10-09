const express = require('express');

const nodemailer = require("nodemailer");

let app = express();
app.use(express.json())

const cors = require('cors')
require("dotenv").config();
const allowedOrigins = [
  
  "http://127.0.0.1:3000"
];

app.use(cors(
    {
        origin:allowedOrigins,
        methods:["POST","GET"],
        credentials:true,
    }
))

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD
  },
});

app.post('/send',async(req,res)=>{
    const info = await transporter.sendMail({
    from: `"Enquiry mail"  <${process.env.AUTH_EMAIL}>`,
    to: "sujeetk07555@gmail.com",
    subject:`${req.body.subject}`, // Subject line
    text: "Hello world?", // plain‑text body
    html: `<table>
             <tr>
                 <td>Name</td>
                 <td>${req.body.username}</td>
             </tr>
             <tr>
                 <td>Email:-</td>
                 <td>${req.body.email}</td>
             </tr>
             <tr>
                 <td>Subject:-</td>
                 <td>${req.body.subject}</td>
             </tr>
             <tr>
                 <td>Message:-</td>
                 <td>${req.body.message}</td>
             </tr>
         </table>` , // HTML body
  });

  console.log("Message sent:", info.messageId);
  res.send("email send")
})



app.listen(process.env.PORT ,()=>{
    console.log('server is running');
})
