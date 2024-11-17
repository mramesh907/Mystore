import CategoryModel from '../models/category.model.js';

export const addCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if(!name || !image){
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      });
    }
    const addCategory= new CategoryModel({
        name,
        image
    })
    const saveCategory = await addCategory.save()
    if(!saveCategory){
        return res.status(500).json({
            message: 'Category not added',
            error: true,
            success: false,
        })
    }
    return res.status(200).json({
      message: 'Category added successfully',
      success: true,
      error: false,
      data: saveCategory
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getCategoryController = async(req,res)=>{
  try {
    const data = await CategoryModel.find()
    return res.status(200).json({
        message: 'Category fetched successfully',
        success: true,
        error: false,
        data: data
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
      error: true
      success:false
  }
}