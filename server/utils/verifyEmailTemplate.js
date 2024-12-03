const verifyEmailTemplate = ({ name, userId }) => {
  let url = `${process.env.FRONTEND_URL}/verify-email?code=${userId}`;
  return `
    <div>
      <p>Dear ${name},</p>
      <p>Click the link below to verify your email:</p>
      <a href="${url}" style="color: white; background-color: #071263; padding: 20px; display: block; text-align: center; text-decoration: none; margin-top: 10px;">
        Verify Email
      </a>
      <br />
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,</p>
      <p>Mystore</p>
    </div>
  `;
};

export default verifyEmailTemplate;