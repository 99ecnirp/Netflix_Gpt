export const checkValidateData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(!isEmailValid){
        return "Invalid email id."
    }
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if(!isPasswordValid){
        return "Invalid password."
    }
    return null;
};

export const checkSignUpData = (fullName) => {
    const isFullNameValid = /^([a-zA-z,/.-]+)\s([a-zA-z,/.-]+)$/.test(fullName);
    if(!isFullNameValid){
        return "Invalid full name."
    }
    return null;
}