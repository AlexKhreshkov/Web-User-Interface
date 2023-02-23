### Describe in words what unit tests you would implement to check the functionality of the authentication service.
I used both local storage and database to authenticate users. We can write unit tests for the function that interacts with the database to save the expected behavior of this function. For example, we can get a response with the following interface (User(id, username, password)). If the user entity in the database changes unit tests will fall and will know about the discrepancy (interfaces won’t help to solve this problem, because only with unit tests we can get real data). To log in user must have the next pair: role key: username in the local storage. If it doesn’t, he can authenticate by providing a username and password. Users can’t have only 1 role stored in the database and local storage, so we must check this condition during auth. That’s we used the following unit tests:
```bash
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
```

# `Run app with fake db`
npm run dev

## `Run test`
npm run test

<h3 id="frontend">Used technologies:</h3>
 <ol>
        <li>React/TypeScript</li>
        <li>React router v.6.4.4</li>
        <li>
            <a href='https://redux-toolkit.js.org/'>Redux Toolkit (state manager)</a>
        </li>        <li>
            <a href="https://www.npmjs.com/package/json-server#add-custom-routes">
                JSON Server
            </a>
        </li>
        <li>
            <a href="https://www.npmjs.com/package/axios">
                Axios (to send requests instead of fetch)
            </a>
        </li>
        <li>
            <a href="https://react-icons.github.io/react-icons/icons?name=io5">
                React icons
            </a>
        </li>
    </ol>

## `Database diagram`
Planned db diagram:
![image](https://user-images.githubusercontent.com/102662863/219826857-f0227544-f840-4fbc-a774-c392ba972b58.png)

Used in the app db diagram:
![image](https://user-images.githubusercontent.com/102662863/220233069-30368409-f2b4-44fc-85da-328a862427be.png)
