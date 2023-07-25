const JWT = require("jsonwebtoken");
exports.validate = (req,res,next) =>{
 try {
   let token = req.headers.token;
   if (!token || token == null) {
     return res.send({
       success: 0,
       message: "no user logged in",
     });
   }

   let tempData = JWT.verify(token, "shhhhh"); // this value are stored at time of login
   console.log(tempData);
   if (!tempData || tempData == null || tempData == undefined) {
     throw new Error("Failed to Verify Toekn");
   }
   req.session = {
     userId: tempData.userId,
     name: tempData.name,
     phone: tempData.phone,
     email: tempData.email,
     team: tempData.team,
     role: tempData.role,
   };

   return req.session && next();
 } catch (error) {
    console.error(error);
 }
}