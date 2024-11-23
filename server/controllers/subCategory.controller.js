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

export const updateSubCategoryController = async (req, res) => {
    try {
        const { _id ,name, image, category} = req.body

        const checkSubCategory = await SubCategoryModel.findById(_id)

        if(!checkSubCategory){
            return res.status(400).json({
                message: 'SubCategory not found',
                success: false,
                error: true,
            })
        }

        const update = await SubCategoryModel.findByIdAndUpdate(_id, {
          name,
          image,
          category,
        });

        return res.status(200).json({
            message: 'SubCategory updated successfully',
            success: true,
            error: false,
            data: update,
        });

    } catch (error) {
        console.log("error from subCategory controller",error)
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
}

export const deleteSubCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return res.status(200).json({
            message: 'SubCategory deleted successfully',
            success: true,
            error: false,
            data: deleteSub,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
}