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
POST /users — Takes *name*, *about* and *avatar* params as input from *req.body*. Adds new user with these params to the db. Returns this user's obj
GET /cards — returns all the cards
POST /cards — Takes *name* and *link* params as input from *req.body*. Creates new card in the db. Returns this card's obj
DELETE /cards/:cardId — removes the card by :cardId
PATCH /users/me — Takes *name* and *about* params as input from *req.body*. Updates user's profile's info according to the input. Returns updated users's obj in its right before the update condition
PATCH /users/me/avatar — Takes *avatar* param as input from *req.body*. Updates user's profile's info according to the input. Returns updated users's obj in its right before the update condition
PUT /cards/:cardId/likes — Adds user's obj to :cardId's card likes array. Returns this card's obj
DELETE /cards/:cardId/likes — Removes user's obj from :cardId's card likes array. Returns this card's obj
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
