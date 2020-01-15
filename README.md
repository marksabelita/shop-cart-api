#
Sample application of creating shopping carts, joining user to organization and commenting to an organization.

This application uses AWS serverless microservice implementation.

## Postman link for easy testing

[https://www.getpostman.com/collections/bacddea14ceddb588986](https://www.getpostman.com/collections/bacddea14ceddb588986) 

REST API Routes

User
```
get /users

get /user/:id

post /users

put /user/:id

delete /user/:id
```

Product
```
get /products

get /products/:query

get /product/:query

post /products

put /product/:id

delete /product/:id
```

Carts
```
post /cart
```

Reports
```
get /reports/top
```

## Installation

To be able to run this app you need to install node js v8+, once node js is installed just run

```bash
npm install
```

## Usage
If the user is using visual studio code for as text editor you can easily run the application by hitting

```
F5 Key
```

To run the application using command

```
npm run start
```


To run unit and integration testing with code coverage

```
npm run test
```


To deploy the project to the AWS (make sure that you configure the yml first with right domain and should have aws keys available in your server)

```
npm run deploy
```