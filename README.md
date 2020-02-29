# express_sprint-12

## v 1.1.0

Node.js server with express app.
App connects to mongodb `mongodb://localhost:27017/mestodb` using mongoose.
Db has 2 collections:
  + users
  + cards

Realized routes:
```
GET /users — returns all the users
GET /users/:userId - returns the user by :userId
POST /users — creates new user
GET /cards — returns all the cards
POST /cards — creates new card
DELETE /cards/:cardId — removes the card by :cardId
PATCH /users/me — updates user's profile's info
PATCH /users/me/avatar — updates user's avatar
PUT /cards/:cardId/likes — likes the card by :cardId
DELETE /cards/:cardId/likes — removes the lijke from the card by :cardId
```
All the requests with `res.status > 399` are logging in `/src/server/access.log` file by morgan logger.


## Installing

1. Clone repo:

```
git clone git@github.com:fckXYZ/mesto.git
cd mesto
```

2. Install debendencies:

```
npm install
```

3. Choose build:
  + `npm run start` - run server at 3000 port.
  + `npm run dev` - run server at 3000 port with hot-reload enabled.
