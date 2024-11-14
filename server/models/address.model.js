import mongoose from 'mongoose';
const addressSchema = new mongoose.Schema(
  {
    addressLine: {
      type: String,
      default: '',
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      default: '',
      required: [true, 'Please add a city'],
    },
    state: {
      type: String,
      default: '',
      required: [true, 'Please add a state'],
    },
    pincode: {
      type: String,
      default: '',
      required: [true, 'Please add a pincode'],
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
    },
    mobile: {
      type: Number,
      required: [true, 'Please add a mobile number'],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const AddressModel = mongoose.model('address', addressSchema);
export default AddressModel;
