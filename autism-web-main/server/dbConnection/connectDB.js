const mongoose = require("mongoose");

const dbConnect = async (req,res) => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Db-Name : ${connection.connection.name} && Host-Name ${connection.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {dbConnect};