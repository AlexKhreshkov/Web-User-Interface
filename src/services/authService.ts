export const customerRoleKey = "Customer"
export const adminRoleKey = "Admin"

//Customer: 1
//Admin: 2

export const userLogout = () => {
    localStorage.removeItem(customerRoleKey)
}

export const userLogin = (username: string) => {
    adminLogout()
    localStorage.setItem(customerRoleKey, `${username}`)
}

export const adminLogout = () => {
    localStorage.removeItem(adminRoleKey)
};

export const adminLogin = (isAdmin: string) => {
    userLogout()
    localStorage.setItem(adminRoleKey, isAdmin)
}

export const getCurrentAdmin = () => localStorage.getItem(adminRoleKey)
export const getCurrentUser = () => localStorage.getItem(customerRoleKey)
export const currentUserExists = (): boolean => !!localStorage.getItem(customerRoleKey)
export const currentAdminExists = (): boolean => !!localStorage.getItem(adminRoleKey)