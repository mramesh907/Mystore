const forgotPasswordEmailTemplate = ({ name, otp }) => {
  return `
    <div>
        <p>Dear ${name}</p>
        <p>Use the following OTP to reset your password</p>
        <h1 style="text-align: center ;background-color: yellow; padding: 10px ">${otp}</h1>
        <p>This OTP is valid for 2 minutes.Enter this otp in Mystore to proceed with resetting your password </p>
        <br/>
        </br>
        <p>Thanks</p>
        <p>Mystore</p>

    </div>
    `;
};

export default forgotPasswordEmailTemplate;
