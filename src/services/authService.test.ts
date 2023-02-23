import { adminLogin, adminLogout, adminRoleKey, customerRoleKey, userLogin, userLogout } from "./authService";

describe("Test localstorage auth", () => {
    test("userLogin", () => {
        userLogin("Username123")
        const customer = localStorage.getItem(customerRoleKey)
        const admin = localStorage.getItem(adminRoleKey)
        expect(typeof customer === "string" && typeof admin !== "string").toBeTruthy()
    })
    test("adminLogin", () => {
        adminLogin("adminName")
        const customer = localStorage.getItem(customerRoleKey)
        const admin = localStorage.getItem(adminRoleKey)
        expect(typeof customer !== "string" && typeof admin === "string").toBeTruthy()
    })
    test("userLogout", () => {
        userLogout()
        expect(typeof localStorage.getItem(customerRoleKey)).not.toBe("string")
    })
    test("adminLogout", () => {
        adminLogout()
        expect(typeof localStorage.getItem(adminRoleKey)).not.toBe("string")
    })
})

