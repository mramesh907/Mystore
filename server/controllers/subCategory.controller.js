import SubCategoryModel from '../models/subCategory.model.js';

export const addSubCategoryController = async (req, res) => {
    try {

        const { name , image, category } = req.body

        if(!name && !image && !category[0]){
            return res.status(400).json({
                message: 'All fields are required',
                success: false,
                error: true,
            });
        }

        const payload={
            name,
            image,
            category
        }
        const addSubCategory = new SubCategoryModel(payload);
        const saveSubCategory = await addSubCategory.save();
        if (!saveSubCategory) {
            return res.status(500).json({
                message: 'SubCategory not added',
                success: false,
                error: true,
            });
        }

        return res.status(200).json({
            message: 'SubCategory added successfully',
            success: true,
            error: false,
            data: saveSubCategory,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
}

export const getSubCategoryController = async (req, res) => {
    try {
      const data = await SubCategoryModel.find()
        .sort({ createdAt: -1 })
        .populate('category');
      // category
      return res.status(200).json({
        message: 'SubCategory fetched successfully',
        success: true,
        error: false,
        data: data,
      });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
}