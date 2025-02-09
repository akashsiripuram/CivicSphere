import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Use 587 for STARTTLS
    secure: false,
    auth: {
      user: "akashsiripuram05@gmail.com", // Your email from .env
      pass: "uqfcpoxuzvfiwvuo", // Your app-specific password from .env
    },
  });
export default async function sendMail(email,msg){
  

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

 
  

  try {
    await transporter.sendMail({
      from: "akashsiripuram05@gmail.com",
      to: email,
      subject: "Joined Project",
      text: msg,
    });
    
    
  } catch (error) {
   
    
  }
}


  