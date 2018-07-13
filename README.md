# project-viaje

## Description

The app is a group event organizer
 
 ## User Stories

List of user stories in order of priority/importance.

 - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and signup or login.
 - **sign up** - As a user, I want to register on the website to create and share trips.
 - **login** - As a user I want to be able to login on the web page so that I can get back to my account.
 - **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
 - **create trip** - As a user, I want to create a trip to be able to invite others to attend.
 - **join to trip** - As a user I want to be able to add myself to an already existing trip 
 - **create flight** - As a user I want to create a flight plan in my trip so the other particpants can see my flight
 - **join flight** - As a user I want to be able to add myself to an already created flight plan
 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
 - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

## Backlog

List of other features outside of the MVPs scope

User trips:
- We want users to be able to see which participants have not yet been added to a flight plan 

Trip events
- We want to be able to add some sort of flight tracking ability

## ROUTES:
```
GET / 
```
## SIGNUP
```
GET /auth/signup
POST auth/signup - POST Body: username, password
```
## LOGIN
```
GET /auth/login
POST /auth/login - POST Body: username, password
```
## LOGUOT
```
POST auth/logout - POST Body: nothing
```
## PROFILE
```
GET /profile
POST /trips/:id/edit - We send the trip id directly in the post
```
## TRIP CREATION
```
GET /trips/new
POST /trips/:id - We send the trip id directly in the post
```
## ADDING TO FLIGHT
```
GET /trips/:id
POST /trips/:id/flight/:number/edit
```

## FLIGHT CREATION
```
GET /trips/:id/flight
POST /trips/:id/flight/:flightnumber
```

## MODELS

```
Event
 - name: String
 - description: String
 - date: Date
 - location: String
 - attendees: ObjectId
```    
 
```
User
 - username: String
 - password: String
```

## Links

### Trello

[Link to your trello board](https://trello.com)

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides.com

The url to your presentation slides

[Slides Link](http://slides.com)
