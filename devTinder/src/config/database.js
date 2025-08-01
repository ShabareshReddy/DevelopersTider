const mongoose=require("mongoose");

const connectionDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://milkabhau87:TzHQ9RuMGLHembNJ@namastenode.e5moccv.mongodb.net/divTinder"
    );
};

module.exports={connectionDB};