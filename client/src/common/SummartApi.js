export const baseURL = 'http://localhost:8080';

const SummaryApi = {
  register: {
    url: '/api/user/register',
    method: 'post',
  },
  verifyEmail: {
    url: '/api/user/verify-email',
    method: 'post',
    params: {
      code: '', // This will be populated dynamically when calling the endpoint
    },
  },
  login: {
    url: '/api/user/login',
    method: 'post',
  },
  forgot_password: {
    url: '/api/user/forgot-password',
    method: 'put',
  },
  forgot_password_otp_verification: {
    url: '/api/user/verify-forgot-password-otp',
    method: 'put',
  },
  resetPassword: {
    url: '/api/user/reset-password',
    method: 'put',
  },
  refreshToken: {
    url: 'api/user/refresh-token',
    method: 'post',
  },
  userDetails: {
    url: '/api/user/user-details',
    method: 'get',
  },
  logout: {
    url: '/api/user/logout',
    method: 'get',
  },
  uploadAvatar: {
    url: '/api/user/upload-avatar',
    method: 'put',
  },
  updateUserDetails: {
    url: '/api/user/update-user',
    method: 'put',
  },
  addCategory: {
    url: '/api/category/add-category',
    method: 'post',
  },
  uploadImage: {
    url: '/api/file/upload',
    method: 'post',
  },
  getCategory: {
    url: '/api/category/get-category',
    method: 'get',
  },
  updateCategory: {
    url: '/api/category/update-category',
    method: 'put',
  },
  deleteCategory: {
    url: '/api/category/delete-category',
    method: 'delete',
  },
  addSubCategory: {
    url: '/api/subcategory/add-sub-category',
    method: 'post',
  },
  getSubCategory: {
    url: '/api/subcategory/get-sub-category',
    method: 'post',
  },
  updateSubCategory: {
    url: '/api/subcategory/update-sub-category',
    method: 'put',
  },
  deleteSubCategory: {
    url: '/api/subcategory/delete-sub-category',
    method: 'delete',
  },
  addProduct: {
    url: '/api/product/add-product',
    method: 'post',
  },
  getProduct: {
    url: '/api/product/get-product',
    method: 'post',
  },
};
export default SummaryApi;
