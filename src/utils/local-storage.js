export const setToLocalStorage = (key,token) =>{
   
    return localStorage.setItem(key,token)
}

export const getFromLocalStorage = (key) => {
   
    return localStorage.getItem(key)
}