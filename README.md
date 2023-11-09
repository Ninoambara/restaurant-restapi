# Cakeplabs Technical Test (Express.js and MongoDB)

This repository contains the code for the Cakeplabs Technical Test, a simple application built with Express.js and MongoDB.

## Prerequisites

- Node.Js
- Express.Js
- MongoDB

## Running Localy

1. Clone this repository:

   ```
    git clone  https://github.com/Ninoambara/restaurant-restapi.git
   ```

2. Go to restaurant-api:

   ```
    cd restaurannt-api
   ```

3. Install Depedencies:

   ```
    npm install
   ```

4. Copy the env file:

   ```
    cp .env.example .env
   ```

5. Configure the environment variables in the .env file to match your local MongoDB settings.

   ```
    MONGO_URL=mongodb+srv://<mongodbusername>:<password>@cluster0.wg7pw1e.mongodb.net retryWrites=true&w=majority&appName=AtlasApp
    KEY=secret_key
   ```

6. Seeding the DB:

   ```
    npm run seed
   ```

7. Run the repository locally:

   ```
    nodemon app.js OR node app.js
   ```
8. To access the /menus and /orders APIs, include an access_token in the headers of your requests. Obtain the access_token through the authentication process.

    ```
    example of access token

    access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxNjIxMWM2NTU1ZTgxODNkZTQyZCIsImlhdCI6MTY5OTU1MDc1OH0.-T9ZioUJK7QP_-OrWp5NMqESRXPZEHWms-a5TWm1L2E

    ///you can get the access token after register and login\\\
    ```
# API DOCUMENTATION

### List endpoint

- POST /users/register
- POST /users/login
- GET /users
- GET /menus
- GET /menus/:id
- GET /orders
- POST /orders
- PUT /orders/checkout

# User Registration

### POST /users/register

This endpoint is used to register a new user.

- Request Body:

```js
{
    "username":<String>
    "password":<String>
}
```

- Response 201 - created

```js
{
  message: "New User added";
}
```

- Response 400 - Bad Request

```js
{
  "message": "username cannot empty"
}
OR
{
  "message": "password cannot empty"
}
```

# User Login

### POST /users/login

This endpoint is used for user login.

- Request Body:

```js
{
    "username":<String>
    "password":<String>
}
```

- Response 200 - OK

```js
{
  "access_token": "your-access-token"
}
```

- Response 400 - Bad Request

```js
{
  "message": "username cannot empty"
}
OR
{
  "message": "password cannot empty"
}
```

# Get All User

### GET /users

- Response 200 - OK

```js
{
    "_id": "65200d789175765c43693b08",
    "username": "Nino"
}
```

# Get All Menus

### GET /menus

- Response 200 - OK

```js
{
  [
    {
      _id: 1,
      name: "Pizza",
      price: 50000,
      toppings: [
        {
          _id: "654d14939da4d906e4681c03",
          name: "Cheese",
          menuId: 1,
          price: 12000,
        },
        {
          _id: "654d14939da4d906e4681c04",
          name: "Chicken",
          menuId: 1,
          price: 18000,
        },
        {
          _id: "654d14939da4d906e4681c05",
          name: "Pepper",
          menuId: 1,
          price: 8000,
        },
      ],
      fillings: [
        {
          _id: "654d14939da4d906e4681c0c",
          name: "Cheese",
          menuId: 1,
          price: 12000,
        },
        {
          _id: "654d14939da4d906e4681c0d",
          name: "Tomato",
          menuId: 1,
          price: 9000,
        },
        {
          _id: "654d14939da4d906e4681c0e",
          name: "Tuna",
          menuId: 1,
          price: 20000,
        },
      ],
    },
  ];
}
```

# Get Menus by Id

### GET /menus/:id

- Response 200 - OK

```js
{
  [
    {
      _id: 1,
      name: "Pizza",
      price: 50000,
      toppings: [
        {
          _id: "654d14939da4d906e4681c03",
          name: "Cheese",
          menuId: 1,
          price: 12000,
        },
        {
          _id: "654d14939da4d906e4681c04",
          name: "Chicken",
          menuId: 1,
          price: 18000,
        },
        {
          _id: "654d14939da4d906e4681c05",
          name: "Pepper",
          menuId: 1,
          price: 8000,
        },
      ],
      fillings: [
        {
          _id: "654d14939da4d906e4681c0c",
          name: "Cheese",
          menuId: 1,
          price: 12000,
        },
        {
          _id: "654d14939da4d906e4681c0d",
          name: "Tomato",
          menuId: 1,
          price: 9000,
        },
        {
          _id: "654d14939da4d906e4681c0e",
          name: "Tuna",
          menuId: 1,
          price: 20000,
        },
      ],
    },
  ];
}
```

- Response 404 - Not found

```jsx
{
  error: "Menu not found";
}
```

# Get All Orders

### GET /orders

- response 200 - OK

```js
[
  {
    _id: "654d16901c6555e8183de42e",
    menuId: "1",
    filling: "654d14939da4d906e4681c0c",
    topping: "654d14939da4d906e4681c03",
    status: false,
    totalPrice: 74000,
    userId: "654d16211c6555e8183de42d",
  },
];
```

# Add new Order

### POST /orders

- Request Body

```js
{
    menuId: <integer>,
    filling: <integer>,
    topping: <integer>
}
```

- Response 200 - OK

```js
{
    "message": "Your order of Pizza success"
}
```

- Response 400 - Bad Request

```js
[
    {
        error: "Invalid input data"
    }
    or
    {
        error: "Invalid filling selection"
    }
    or
    {
        error: "Invalid topping selection"
    }
    or
    {
        error: "Invalid filling or topping for the selected menu"
    }
]
```

- Response 404 - Not found

```js
{
  error: "Menu Not Found";
}
```

# Checkout The Orders

### PUT /orders/checkout

- Request body

```
    orderId: <integer> example <654d2109f592f0df29d486df>
```

- Response 200 - OK

```js
{
    "message": "Order checked out successfully"
}
```

- Response 400 - Bad Request

```js
[
    {
        error: "Invalid input data"
    }
    or
    {
        error: "Order has already been checked out"
    }
]
```

- Response 404 - Not Found

```js
{
  error: "Order not found";
}
```

### Global Error

response 500 - Internal Server Error

```js
{
    "message": "Internal server error"
}
```

Response 401 - Unauthorized

```js
{
  "message": "Invalid token"
}
```
