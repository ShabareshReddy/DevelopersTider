const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const connectionRequestSchema=new Schema({

    fromUserId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    toUserId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type:"string",
        requires:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
    
},
{timestamps:true}
);
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("the user doesnot send request itself!!!!!!");
    }
    next();
})


module.exports=mongoose.model("connectionRequest",connectionRequestSchema);