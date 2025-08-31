export const validationEmail = (email) => {
    if(email.trim()){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    return false;
}