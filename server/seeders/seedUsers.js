const db = require('../models')
const {User} = db

async function seedUser(sequelize){
    
    const userExist = await User.findOne({
        where:{
            name: "admin"
        }
    })

  if(!userExist){
    await User.create({
        name: "admin",
        user_name: "admin123",
        email: "johhnythepogi@gmail.com",
        role: "Admin",
        password:"admin123",
        active:true
    })
    console.log('admin added')
  }else{
    console.log('admin already exists') 
  }

}

module.exports = seedUser