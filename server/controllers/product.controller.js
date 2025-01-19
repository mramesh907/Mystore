import ProductModel from '../models/product.model.js';
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      moreDetails,
    } = req.body;
    
    if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price  || !description){
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      });
    }
    if((stock < 0) || (price < 0) || (discount < 0)){
      return res.status(400).json({
        message: 'Stock, price and discount cannot be negative',
        error: true,
        success: false,
      });
    }

    const addProduct = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      moreDetails,
    });
    const saveProduct = await addProduct.save();
    if (!saveProduct) {
      return res.status(500).json({
        message: 'Product not added',
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Product added successfully',
      success: true,
      error: false,
      data: saveProduct,
    });

  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

// get product
export const getProductController = async (req, res) => {
  try {
    let { page, limit, search } = req.body;

    if (!page){
      page= 1
    }
    if(!limit){
      limit= 10
    }
    
    
    const query = search
      ? {
          // for full text search:-
          // $text: { $search: search },

          // for partial text search:-
          $or: [
            { name: { $regex: search, $options: 'i' } }, // Partial match on name
            { description: { $regex: search, $options: 'i' } }, // Partial match on description
          ],
        }
      : {};
      
    const [data, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ProductModel.countDocuments(query),
    ]);
    return res.status(200).json({
      message: 'Product fetched successfully',
      success: true,
      error: false,
      data:data,
      totalCount:totalCount,
      totalNoPage : Math.ceil(totalCount/limit)
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
}

// get product by category
export const getProductByCategoryController = async (req, res) => {
  try {
    const { id } = req.body;
    if(!id){
      return res.status(400).json({
        message: 'Category id is required',
        error: true,
        success: false,
      });
    }
    const data = await ProductModel.find({ category: { $in: [id] } }).limit(10).sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'Product fetched successfully',
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

export const getProductByCategoryAndSubCategoryController = async (req, res) => {
  try {
    const { categoryId, subCategoryId,page,limit } = req.body; 
    if(!categoryId || !subCategoryId){
      return res.status(400).json({
        message: 'Category id and subcategory id is required',
        error: true,
        success: false,
      });
    }
    if(!page){
      page= 1
    }
    if(!limit){
      limit= 10
    }
    const [data, totalCount] = await  Promise.all([
      ProductModel.find({ category: { $in: [categoryId] }, subCategory: { $in: [subCategoryId] } }).limit(limit).skip((page-1)*limit).sort({ createdAt: -1 }),
      ProductModel.countDocuments({ category: { $in: [categoryId] }, subCategory: { $in: [subCategoryId] } })
    ])
    return res.status(200).json({
      message: 'Product fetched successfully',
      success: true,
      error: false,
      data: data,
      totalCount:totalCount,
      limit:limit,
      page : Math.ceil(totalCount/limit)
    });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
}