import {check,validationResult} from "express-validator";


class Validator{
static validateInput =(req,res,next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    const errorMessage= errors.errors.map((err)=>err.msg)
    return res.status(400).json({message:errorMessage})
}
return next();
};
static newAccountRules=()=>{
    return[
        check("email","email is invalid").trim().isEmail(),
        check("password","password is not strong").trim().isStrongPassword(),
        check("lastName","last name should be valid").trim().isAlpha(),
        check("firstName","first name should be valid").trim().isAlpha(),
        check("gender","gender should be among male,female,other,no-say")
        .trim().isIn(['male','female','other','no-say'])
    ]
}
static newTourAccountRules=()=>{
    return[
        check("title","title is invalid").trim().isString(),
        check("seats","seat is not Valid must be number").isNumeric(),
        check("price","price is not Valid must be number").isNumeric(),
        check("available","available space is not Valid must be number").isNumeric(),
        check("dateScheduled","dateScheduled is not Valid ").isDate(),
        check("dueDate","dueDate is not Valid ").isDate(),
]

}

}


export default Validator;