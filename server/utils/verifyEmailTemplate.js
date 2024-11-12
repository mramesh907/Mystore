const verifyEmailTemplate = ({name, url}) => {
    return `
    <h1>Hi ${name}</h1>
    <p>Click the link below to verify your email</p>
    <a href="${url}" style="color:white;background-color:#071263; margin-top: 10px ;padding: 20px;display:block"> 
    Verify Email
     </a>
    
    `
}
export default verifyEmailTemplate