QUESTION 2 ONLY: ONLINE FOOD ORDERING SYSTEM
Course: CS-301L Full Stack Web Development

DATABASE CREDENTIALS INCLUDED FOR THIS LOCAL PROJECT
Username: postgres
Password: MyNewPassword123
Database: food_ordering
Host: localhost
Port: 5432
API key: quiz-api-key
Application URL: http://localhost:3001

RUN ON LINUX MINT
1. Extract this folder.
2. Open Terminal inside the extracted Question_2_Online_Food_Ordering folder.
3. Run:
   chmod +x RUN_LINUX_MINT.sh
   ./RUN_LINUX_MINT.sh
4. Enter your Linux user password if sudo asks.
5. Wait until NestJS reports that the application is running.
6. Open http://localhost:3001

The script starts PostgreSQL, sets the PostgreSQL postgres-user password to the
credential above, creates food_ordering if missing, installs npm dependencies,
and starts NestJS.

FRONTEND PAGES
Dashboard:   http://localhost:3001/
Restaurants: http://localhost:3001/restaurants.html
Menu Items:  http://localhost:3001/menu-items.html

HOW TO USE
1. Open Restaurants from the navbar.
2. Add a restaurant, for example "Khan Restaurant".
3. Open Menu Items from the navbar.
4. Add an item name, positive price, and select the restaurant.
5. Use Edit and Delete in the Menu Items table to update or remove items.

API ROUTES
Restaurants:
GET  /restaurants
POST /restaurants

Menu Items (send header x-api-key: quiz-api-key):
GET    /menu-items
GET    /menu-items/:id
POST   /menu-items
PUT    /menu-items/:id
PATCH  /menu-items/:id
DELETE /menu-items/:id

EXAMPLE API TESTS (open a second terminal while the app is running)
List restaurants:
curl -s http://localhost:3001/restaurants | jq .

Add restaurant:
curl -s -X POST http://localhost:3001/restaurants -H "Content-Type: application/json" -d '{"name":"Khan Restaurant"}' | jq .

List menu items:
curl -s http://localhost:3001/menu-items -H "x-api-key: quiz-api-key" | jq .

Add menu item (replace restaurantId with an ID returned by GET /restaurants):
curl -s -X POST http://localhost:3001/menu-items -H "Content-Type: application/json" -H "x-api-key: quiz-api-key" -d '{"name":"TEA","price":140,"restaurantId":1}' | jq .

NOTES
- This is a local development project. The included password is for this project only.
- Do not expose this database password or API key on a public server.
- Bootstrap is loaded from its CDN, so an internet connection is needed for Bootstrap styling.
- TypeORM synchronize is enabled for this coursework project.
