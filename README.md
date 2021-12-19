

# Description

website for compare delivery price from  alot of delivery food  Apps, that you can order your favorite food and get it deliverd to wherever you are from any delivery food  Apps you want. 

# User Story
- **Visitor:**

  the visitor can browse between alot of delivery company and their restaurant **but** he can't order unless he register or login. 


- **SignUp:**
1. Single User : The user can Register to my website ,so that he can start order,user able to serach between alot of restaurant and see their offer. 
2. Restaurant : The Restaurant can Register to my website ,so that he can start Adding, Updating and Delete item in his restaurant menu.

- **LogIn:**
1. Login User : if user already signup he can login directly to make his order,user able to serach between alot of restaurant and see their offer.

2. Login Restaurant : if user already signup he can login directly to do CRUD for his menu

- **LogOut:**
  A user or restaurant con logout from the website by click logout Button

- **Company Category:**
1. Jahez
2. Hunger Station
3. To You

- **Resturant:**
for each company it has own Restaurants.

- **Resturant Menu:**
Each restaurant has own category.

# Models
### Refrance:
| Models | Refrance of |
| --- | --- |
| Role | -  |
| User | Ref: Role , Ref :Restaurant
| Company | Ref: Restaurants
| Restaurant | Ref: Food Menu  |
| Order | Ref: Company , Ref: User  |
| Food Menu | -  |

### Models Keys:
| Models | Keys |
| --- | --- |
| Role | Name, Permission  
| User | UserName, email,password,Role,Location 
| Company | name, Restaurants, offers
| Restaurant |name, Category ,Menu,Pic, Delivery price  |
| Order | UserId, CompanyId  |
| Food Menu | Name, Pic, desc, Category |

## Models Detils:
### Role

| Key | Type | Require | Default 
| --- | --- | --- | --- |
| Name | String | Yes |-  
| Permission | Array of String | Yes |["Read","Create"] 

### User

| Key | Type | Require | Default 
| --- | --- | --- | --- |
| UserName | String | Yes |-  
| email | String | Yes |- 
| password | String | Yes |-  
| Role | Ref to **Role** | Yes |3u84474829hr9uh34  
| Location | String | No |Qassim -Burydah  

### Company

| Key | Type | Require | Default 
| --- | --- | --- | --- |
| name | String | Yes |-  
| Restaurants | Ref to **Restaurant** | Yes |- 
| offers | String | No |-  

### Restaurant

| Key | Type | Require | Default 
| --- | --- | --- | --- |
| name | String | Yes |-  
| Category | String | Yes |- 
| Pic | String | Yes |-  
| Menu | Ref to **FoodMenu** | Yes |-  
| Delivery price | Number | Yes |- 


### Order
| Key | Type | Require | Default 
| --- | --- | --- | --- |
| UserId | Ref to **User** | Yes |-  
| CompanyId | Ref to **Company** | Yes |-

### Food Menu

| Key | Type | Require | Default 
| --- | --- | --- | --- |
| name | String | Yes |-  
| desc | String | No |-  
| Category | String | Yes |- 
| Pic | String | Yes |-  


# ER-Digram

![This is an image](./ERD.png)
#

![This is an image](./ERDD.png)

# Backend routes
| HTTP Method | URL | Success status | Error Status |  Permissions| Request Body |
| ---         |     ---      |     ---      |          --- |          --- |          --- |
| Post   | `/login`     | 200    | 400   | User , Admin, Company| {userName,email,password}
| Post     | `/signUp`      |201     | 400   |User , Admin, Company |{userName,email,password}
| Post    | `/additem`       |201     | 400 |Admin, Company| {name,Category,Pic}
| Post     | `/addRest`       |201     | 400|Company| {name,Category,Pic, Delivery Price}
| get     | `/getRest`       |200     | 400 |User , Admin, Company| -
| get     | `/users`       |200     | 400 |Admin|-
| get   |`/cart`|200     | 400  |User |-
| get     | `/order`       |200     | 400|User|-
| delete     | `/user/id `      |200     | 400|Admin|{_id}
| delete     | `/delRest/id`       |200 | 400 | Company|{_id}
| Put     | `/edititem/id`       |200| 400 | Company|{_id,name,Category,Pic}
| Put     | `/editRest/id`       |200| 400 |User , Admin, Company|{_id,name,Category,Pic, Delivery Price}
# UML-Digram

![This is an image](./UMLL.png)


# WireFrame
### Main Page
![This is an image](./WF1.png)

### When Click on **Show offers**
![This is an image](./WF2.png)

### Chose the Restaurant


![This is an image](./WF3.png)

### Your Cart

![This is an image](./WF4.png)

# Upload our Work on github:

| Command | Description |
| --- | --- |
| git add . | add our work  |
| git commit | add comment before upload it staged 
| git push | Upload it to your github Repo

# Links:

1. Link to Trello board => https://trello.com/b/0o0jzsX9/mp-project-eyad

2. My github Page => https://github.com/Eyad911

3. Link to my presentation=> https://eyad.com

4. Link to Client => https://github.com/MP-Project-Eyad/client