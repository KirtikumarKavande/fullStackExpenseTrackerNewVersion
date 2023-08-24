const signupUserModel=require("../model/userSignup")
exports.signUpUser=async(req,res,next)=>{
    console.log(req.body)
    
    try{
        signupUserModel.create(req.body)

    }catch(err){
        console.log(err)
    }
    res.send("signUp successfully")

}