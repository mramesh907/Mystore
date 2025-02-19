import addressmodel from "../models/address.model.js";
import usermodel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
    try {        
        const { addressLine, city, state, pincode, country, mobile } = req.body;
        const userId = req.userId; // comeing from auth middleware
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const address = new addressmodel({
          addressLine,
          city,
          state,
          pincode,
          country,
          mobile,
          userId,
        });
        const savedAddress = await address.save();
        const addUserress = await usermodel.findByIdAndUpdate(
          { _id: userId },
          { $push: { addressDetails: savedAddress?._id } }
        );
        return res.status(201).json({ message: "Address added successfully", data: savedAddress , success: true, error: false});
    } catch (error) {
        return res.status(500).json({ message: error.message , success: false, error: true});
    }
};

export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId; // comeing from auth middleware
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const address = await addressmodel.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Address fetched successfully", data: address , success: true, error: false});
    } catch (error) {
        return res.status(500).json({ message: error.message , success: false, error: true});
    }
}

export const updateAddressController = async(req,res)=>{
    try{
        const userId= req.userId; // comeing from auth middleware
        const {_id, addressLine, city, state, pincode, country, mobile } = req.body;
        if(!_id || !addressLine || !city || !state || !pincode || !country || !mobile || !userId){
            return res.status(400).json({ message: "Invalid request. Please provide all required fields" });
        }
        const address = await addressmodel.findById({_id, userId});
        if(!address){
            return res.status(404).json({ message: "Address not found" });
        }
        address.addressLine = addressLine;
        address.city = city;
        address.state = state;
        address.pincode = pincode;
        address.country = country;
        address.mobile = mobile;
        const updatedAddress = await address.save();
        return res.status(200).json({ message: "Address updated successfully", data: updatedAddress , success: true, error: false});
    }catch(error){
        return res.status(500).json({ message: error.message , success: false, error: true});
    }
}

export const deleteAddressCOntroller = async(req,res)=>{
    try {
        const userId = req.userId; // comeing from auth middleware
        const { _id } = req.body;
        if (!_id || !userId) {
            return res.status(400).json({ message: "Invalid request. Please provide all required fields" });
        }
        const address = await addressmodel.findById({ _id, userId });
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
       const deletedAddress = await addressmodel.findByIdAndUpdate({ _id, userId }, { $set: { status: false } });
        return res.status(200).json({ message: "Address deleted successfully", data: deletedAddress , success: true, error: false });
    } catch (error) {
        return res.status(500).json({ message: error.message , success: false, error: true}); 
    }
}