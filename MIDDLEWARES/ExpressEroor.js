class ExpressEroor extends Error{//inheritance
    constructor(status,message){
        super();
        this.status = status,
        this.message = message
    }
}
module.exports = ExpressEroor;
//npx nodemon index.js