// Mock SMS OTP Service
// In production, use Twilio or similar SMS gateway

const sendOTP = async (mobileNumber, otp) => {
  try {
    // Mock implementation - just log the OTP
    console.log(`📱 SMS OTP Service`);
    console.log(`To: ${mobileNumber}`);
    console.log(`OTP: ${otp}`);
    console.log(`Message: Your MedFlow OTP is ${otp}. Valid for 10 minutes.`);
    
    /* 
    // Real Twilio implementation (uncomment when ready):
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    await client.messages.create({
      body: `Your MedFlow OTP is ${otp}. Valid for 10 minutes. Do not share this code.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobileNumber}`
    });
    */
    
    return {
      success: true,
      message: 'OTP sent successfully'
    };
  } catch (error) {
    console.error('SMS OTP Error:', error);
    return {
      success: false,
      message: 'Failed to send OTP'
    };
  }
};

const verifyOTP = (storedOTP, providedOTP, otpExpiry) => {
  if (!storedOTP || !otpExpiry) {
    return {
      valid: false,
      message: 'No OTP found. Please request a new OTP.'
    };
  }
  
  if (new Date() > new Date(otpExpiry)) {
    return {
      valid: false,
      message: 'OTP has expired. Please request a new OTP.'
    };
  }
  
  if (storedOTP !== providedOTP) {
    return {
      valid: false,
      message: 'Invalid OTP. Please try again.'
    };
  }
  
  return {
    valid: true,
    message: 'OTP verified successfully'
  };
};

module.exports = {
  sendOTP,
  verifyOTP
};
