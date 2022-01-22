const verifyAccess=(requiredRole)=>{
    return async(req,res,next)=>{
        try {
          const {role}=req.user;
          if(requiredRole!=role){
              return res.status(401).json({error:"Unauthorised! you don't have access to this api"});

          } 
          return next();
        } catch (error) {
            console.log(err);
            
        }
    }
}

export default verifyAccess;