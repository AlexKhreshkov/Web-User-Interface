const customerRoleKey = "Customer";
const adminRoleKey = "Admin";

//Customer: 1
//Admin: 2

export const logout = () => {
  localStorage.removeItem(customerRoleKey);
};

export const login = (userId: number) => {
  localStorage.setItem(customerRoleKey, `${userId}`);
};

export const adminLogout = () => {
  localStorage.removeItem(adminRoleKey);
};

export const adminLogin = (isAdmin: string) => {
  localStorage.setItem(adminRoleKey, isAdmin);
};

export const getAdminRole = () => localStorage.getItem(adminRoleKey);
export const currentUserExists = (): boolean => !!localStorage.getItem(customerRoleKey);
export const getCurrentUser = () => localStorage.getItem(customerRoleKey);
