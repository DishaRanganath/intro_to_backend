//models the schema from er diagrams .they are basically the coded versions of 
import mongoose, { Schema} from "mongoose";
import bcrypt from "bcryptjs";// to hash or compare passwords
const userschema=new Schema (
    {
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // to clear white space
            minlength:1,
            maxlength: 30,
        },
        password:{
            type: String,
            required: true,
            minlength: 8,
            //maxlength: 50,
        },
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // to clear white space
           
        }
    },
    {
       timestamps: true
    }
)
userschema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



export const User=mongoose.model("User",userschema)