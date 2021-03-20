<img src="http://res.cloudinary.com/devpor11z/image/upload/v1616271999/uw7ola7xyy2pcwgwhhz5.png" alt="react-store-logo" />
<h3><i>Title: </i><br><b>Vue Store</b> - great choice for your sales.</h3>

### <i>Introduction: </i><br>
Vue store is simple solution for publishing, managing and selling your products with user-friendly UI.
The main goal is to make each seller's products available globally. The online store can be accessed as guest,
registered user with standard privileges and there is also administrative area.

### <i>Technologies: </i><br>
The application consists two parts - back-end REST API, based on Express.js and front-end application,
based on the amazing Vue framework.

### <i>Launch settings: </i><br>
The REST API is located in the 'my-express-api' folder, in which .env file should be put with this info, needed for MongoDB Atlas database access:<br>
PORT={specifiy port}<br>
DB_URL=mongodb+srv://{specify username}:{specify password}@aws-8thve.mongodb.net/{your database name}?retryWrites=true&w=majority<br>
COOKIE_KEY={your cookie key}<br>
PRIVATE_KEY={your private key}<br>
Then navigate to the folder with command prompt, powershell or
any other suitable command-line and execute 'npm install'.then('npm start').catch(check your internet connection :) ). This will start the REST API on
[http://localhost:{port}](http://localhost:{port})
Next, in the project root folder, in separate command-line window run the same 'npm install' and 'npm start' command and
this will start the Vue app on 
After that, it is up to you :)

### <i>Testing: </i><br>
Cypress is used for more complex End-to-End testing with > 85% functionality coverage. Can be started with<br>
'npm run test:cypress' from the project root directory.<br>

### <i>Hosting: </i><br>
The application is hosted on [Heroku]() and can be found on the following link:<br>
[]() <br>
The REST API is hosted also on [Heroku]() and can be found on the following link:<br>
[]()


### <i>Table of contents: </i><br>
1. Public part:<br> 
    * Guest users can access home page with all products listed, page with listed categories so user can browse products by category, register, login pages.<br>
2. Private part:<br>
    * Standard user – can access all public functionalities plus adding products to shopping cart, viewing and removing products from shopping cart, finalizing order and viewing  recent orders history, exploring and update of profile details.
    * Administrator – can access all functionalities, which standart user is able to, plus adding, editing and removing products, also adding and editing categories. Administrators can manage users and ban(deactivate) or unban(activate) user accounts.
