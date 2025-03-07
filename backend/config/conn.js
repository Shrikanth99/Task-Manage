const mongoose = require('mongoose')

const configDB = async() => {
    const url = process.env.DB_URL 
    const name = process.env.DB_NAME 
    try {
        const db = await mongoose.connect(`${url}/${name}`)
        if(db){
            console.log('Conntected to DB',name)
        }
    } catch (e) {
        console.log('error coonnecting to db',e.message)
    }
}

module.exports = configDB
