const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailOTP = require("../mail/templates/emailVerificationTemplate");


const otpSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires in 5 minutes
    }
})

async function sendverificationModel(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Your Verification Email", emailOTP(otp));
        console.log("Email Sent Successfully:", mailResponse);
    }
    catch (error) {
        console.log("Error in sendverificationModel:", error);
        throw error;
    }
}

otpSchema.pre('save', async function(next){
    await sendverificationModel(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otpSchema);