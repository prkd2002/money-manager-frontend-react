//export const BASE_URL = 'https://money-manager-api-1-k4m6.onrender.com/api/v1.0';
export const BASE_URL = 'http://localhost:8080/api/v1.0';
const CLOUDINARY_CLOUD_NAME = "dd0b8zotu";
export const API_ENDPOINTS = {
    LOGIN:'/login',
    REGISTER: '/register',
    GET_USER_INFO: '/profile',
    GET_ALL_CATEGORIES: '/categories',
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY:(categoryId) => `categories/${categoryId}`,
    GET_ALL_INCOMES: '/incomes',
    CATEGORY_BY_TYPE: (type) => `categories/${type}`,
    ADD_ICOME:'/incomes',
    DELETE_INCOME:(incomeId) => `incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/download",
    EMAIL_INCOME:"/incomes/email",
    GET_ALL_EXPENSES: '/expenses',
    ADD_EXPENSES: '/expenses',
    EXPENSE_EXCEL_DOWNLOAD: '/expenses/download',
    EMAIL_EXPENSES: '/expenses/email',
    DELETE_EXPENSE: (expenseId) => `expenses/${expenseId}`,
    APPLY_FILTERS: "/filter",
    DASHBOARD_REQUEST: "/dashboard",
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

}