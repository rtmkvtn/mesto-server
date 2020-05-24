# mesto-server


## v 1.2.0

Node.js server with express app.  
App connects to mongodb `mongodb://localhost:27017/mestodb` using mongoose.  
Db has 2 collections:
  + users
  + cards
____
## Realized routes:
____
## Show Users Collection

Returns array of json datas of all the users

  + ### URL:
  /users

  + ### Method:
  GET

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    [
    {
        "_id": "5e58a43bf2f094dca54126f1",
        "name": "Ivan",
        "about": "developer",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        ...
    },
    ...,
    ]
    ```

  + ### Error response:
    + **Code:** 500 
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____    

## Show User

Returns json data of user

  + ### URL:
  /users/:id

  + ### Method:
  GET

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
    + **Required:**
    id = user._id

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e58a43bf2f094dca54126f1",
      "name": "Ivan",
      "about": "developer",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 404
    + **Content:** `{ message: 'Пользователь с данным id не найден.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Create New User

Adds new user to the db. Returns this user's json data.

  + ### URL:
  /signup

  + ### Method:
  POST

  + ### Authorization:
  None 

  + ### URL Params:
  None

  + ### Data Params:
  name = [String], 2 to 30 characters  
  about = [String], 2 to 30 characters  
  avatar = [url], link to the image 
  email = [email], user's email 
  password = [String], 8+ characters 

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e632ca3f4263a31a3c61015",
      "email": "user@mail.com"
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 422
    + **Content:** `{ "message": "Неверно заполнено одно из полей. Пользователь не может быть создан." }`

____


## Login

Saves authorization token for the user in httpOnly cookie.

  + ### URL:
  /signin

  + ### Method:
  POST

  + ### Authorization:
  None 

  + ### URL Params:
  None

  + ### Data Params:
  email = [email], user's email 
  password = [String], 8+ characters 

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc0MWYwN2RmM2M1YjA2MzhlZjcxNzkiLCJpYXQiOjE1ODQ2ODcxODgsImV4cCI6MTU4NTI5MTk4OH0.HCO0_4yru_qy-MhGdtQ_R5pBC8gpI80xasdDDDaw"
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ "message": "Неверная почта или пароль." }`

____

## Edit User's Info

Updates users name and about data. Returns this user's json data in its before the change condition

  + ### URL:
  /users/me

  + ### Method:
  PATCH

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  name = [String], 2 to 30 characters  
  about = [String], 2 to 30 characters  

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e632ca3f4263a31a3c61015",
      "name": "name",
      "about": "about",
      "avatar": "http://www.avatar.com/image.jpg",
      "email": "user@mail.com",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Edit User's Avatar

Updates users avatar. Returns this user's json data in its before the change condition

  + ### URL:
  /users/me/avatar

  + ### Method:
  PATCH

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  avatar = [url], link to the image  

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "_id": "5e632ca3f4263a31a3c61015",
      "name": "name",
      "about": "about",
      "avatar": "http://www.avatar.com/image.jpg",
      "email": "user@mail.com",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 422
    + **Content:** `{ "message": "Неверно заполнено одно из полей. Пользователь не может быть создан." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Show Cards Collection

Returns array of json datas of all the cards

  + ### URL:
  /cards

  + ### Method:
  GET

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    [
    {
      "likes": [
          {
              "_id": "5e58a84d8f54e1e3d84be5ac",
              "name": "name",
              "about": "about",
              "avatar": "http://www.avatar.com/image.jpg",
              "__v": 0
          }
      ],
      "_id": "5e58f9a8d1973aea3fd90ca2",
      "name": "Irkutsk1",
      "link": "https://avatars.mds.yandex.net/get-zen_doc/1718877/pub_5de82a5e35ca3100afdc4e18_5de82c1c9c944600ae31ad95/scale_1200",
      "owner": {
          "_id": "5e58a84d8f54e1e3d84be5ac",
          "name": "name",
          "about": "about",
          "avatar": "http://www.avatar.com/image.jpg",
          "__v": 0
      },
      "createdAt": "2020-02-28T11:29:44.315Z",
      "__v": 0
    },
    {...},
    ...,
    ]
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

___

## Create New Card

Adds new card to the cards collection. Returns this card's json data

  + ### URL:
  /cards

  + ### Method:
  POST

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  None

  + ### Data Params:
  name = [String], 2 to 30 characters  
  link = [url], link to the image  

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "likes": [
          {
              "_id": "5e58a84d8f54e1e3d84be5ac",
              "name": "name",
              "about": "about",
              "avatar": "http://www.avatar.com/image.jpg",
              "__v": 0
          }
      ],
      "_id": "5e58f9a8d1973aea3fd90ca2",
      "name": "Irkutsk1",
      "link": "https://avatars.mds.yandex.net/get-zen_doc/1718877/pub_5de82a5e35ca3100afdc4e18_5de82c1c9c944600ae31ad95/scale_1200",
      "owner": {
          "_id": "5e58a84d8f54e1e3d84be5ac",
          "name": "name",
          "about": "about",
          "avatar": "http://www.avatar.com/image.jpg",
          "__v": 0
      },
      "createdAt": "2020-02-28T11:29:44.315Z",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 422
    + **Content:** `{ "message": "Неверно заполнено одно из полей. Карточка не может быть создана." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Delete Card

Removes card from cards collection, if it's created by the user. Returns this cards json data

  + ### URL:
  /cards/:id

  + ### Method:
  DELETE

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  id = card._id

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "likes": [
          {
              "_id": "5e58a84d8f54e1e3d84be5ac",
              "name": "name",
              "about": "about",
              "avatar": "http://www.avatar.com/image.jpg",
              "__v": 0
          }
      ],
      "_id": "5e58f9a8d1973aea3fd90ca2",
      "name": "Irkutsk1",
      "link": "https://avatars.mds.yandex.net/get-zen_doc/1718877/pub_5de82a5e35ca3100afdc4e18_5de82c1c9c944600ae31ad95/scale_1200",
      "owner": {
          "_id": "5e58a84d8f54e1e3d84be5ac",
          "name": "name",
          "about": "about",
          "avatar": "http://www.avatar.com/image.jpg",
          "__v": 0
      },
      "createdAt": "2020-02-28T11:29:44.315Z",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 404
    + **Content:** `{ "message": "Карточка с данным id не найдена." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

___

## Like Card

Adds user's json data to card's likes array. Returns this card's json data

  + ### URL:
  /cards/:id/likes

  + ### Method:
  PUT

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  id = card._id

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "likes": [
          {
              "_id": "5e58a84d8f54e1e3d84be5ac",
              "name": "name",
              "about": "about",
              "avatar": "http://www.avatar.com/image.jpg",
              "__v": 0
          }
      ],
      "_id": "5e58f9a8d1973aea3fd90ca2",
      "name": "Irkutsk1",
      "link": "https://avatars.mds.yandex.net/get-zen_doc/1718877/pub_5de82a5e35ca3100afdc4e18_5de82c1c9c944600ae31ad95/scale_1200",
      "owner": {
          "_id": "5e58a84d8f54e1e3d84be5ac",
          "name": "name",
          "about": "about",
          "avatar": "http://www.avatar.com/image.jpg",
          "__v": 0
      },
      "createdAt": "2020-02-28T11:29:44.315Z",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 404
    + **Content:** `{ "message": "Карточка с данным id не найдена." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____

## Dislike Card

Removes user's json data from card's likes array. Returns this card's json data

  + ### URL:
  /cards/:id/likes

  + ### Method:
  DELETE

  + ### Authorization:
  **Required** token from `req.cookies.jwt` 

  + ### URL Params:
  id = card._id

  + ### Data Params:
  None

  + ### Success Response:
    + **Code:** 200
    + **Content:** 
    ```
    {
      "likes": [
      ],
      "_id": "5e58f9a8d1973aea3fd90ca2",
      "name": "Irkutsk1",
      "link": "https://avatars.mds.yandex.net/get-zen_doc/1718877/pub_5de82a5e35ca3100afdc4e18_5de82c1c9c944600ae31ad95/scale_1200",
      "owner": {
          "_id": "5e58a84d8f54e1e3d84be5ac",
          "name": "name",
          "about": "about",
          "avatar": "http://www.avatar.com/image.jpg",
          "__v": 0
      },
      "createdAt": "2020-02-28T11:29:44.315Z",
      "__v": 0
    }
    ```

  + ### Error response:
    + **Code:** 500
    + **Content:** `{ message: 'Произошла ощибка на сервере.' }`  
  OR  
    + **Code:** 404
    + **Content:** `{ "message": "Карточка с данным id не найдена." }`  
  OR  
    + **Code:** 401
    + **Content:** `{ message: 'Необходима авторизация!' }` 

____



## Installing

1. Clone repo:

```
git clone https://github.com/fckXYZ/express_sprint-12.git
cd express_sprint-12
```

2. Install debendencies:

```
npm install
```

3. Choose build:
  + `npm run start` - run server at 3000 port.
  + `npm run dev` - run server at 3000 port with hot-reload enabled.
