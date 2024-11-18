import CategoryModel from '../models/category.model.js';
import SubCategoryModel from '../models/subCategory.model.js';
import ProductModel from '../models/product.model.js';
// add category
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

// get category
export const getCategoryController = async(req,res)=>{
  try {
    const data = await CategoryModel.find().sort({createdAt:-1})
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

// update category
export const updateCategoryController = async(req,res)=>{
  try {
    const { _id ,name, image} = req.body
    const update = await CategoryModel.updateOne({
      _id:_id
    },{
      name,
      image
    })

    return res.status(200).json({
        message: 'Category updated successfully',
        success: true,
        error: false,
        data: update
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
}

// delete category
export const deleteCategoryController = async(req,res)=>{
  try {
    const { _id } = req.body
    // check subcategory
    const checkSubCategory = await SubCategoryModel.find({
      category : {
        "$in" : [_id]
      }
    }).countDocuments()
// check product
    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();
    // check category
    if(checkSubCategory > 0 || checkProduct > 0){
      return res.status(400).json({
        message: 'Category has subcategory or product',
        error: true,
        success: false,
      }) 
    }
    // delete category
    const deleteCategory = await CategoryModel.deleteOne({
      _id:_id
    })

    return res.status(200).json({
        message: 'Category deleted successfully',
        success: true,
        error: false,
        data: deleteCategory
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
}