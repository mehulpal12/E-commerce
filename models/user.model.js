import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isLoggedIn:{
      type:Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return  candidatePassword === this.password 
  
}

export const User = mongoose.model("user", userSchema)