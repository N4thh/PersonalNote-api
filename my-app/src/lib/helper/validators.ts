
// Fix isEmpty - nhận string thay vì any
export const isEmpty = (val: string | null | undefined): boolean => {
    if (val === null || val === undefined) return true;
    return val.trim() === "";
}

export const isStrongPassword = (password: string): boolean => 
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);