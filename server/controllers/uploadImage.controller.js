import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const uploadImageController = async (req,res)=>{
    try {
        const file = req.file

        const uploadImage = await uploadImageCloudinary(file)

        return res.status(200).json({
            message: 'Image uploaded successfully',
            error: false,
            success: true,
            data: uploadImage
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export default uploadImageController