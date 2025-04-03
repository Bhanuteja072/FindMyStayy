# FindMyStayy

FindMyStayy is a full-stack web application for listing and reviewing rental stays. Users can browse available listings, add their own stays, and leave reviews. The project is built using Node.js, Express, MongoDB, and EJS for templating.

## 🌍 Live Demo

You can access the deployed version here: **https://findmystayyy.onrender.com/listings**

## 🏗️ Project Structure

```
└── bhanuteja072-findmystayy/
    └── MajorProject/
        ├── app.js
        ├── cloudConfig.js
        ├── mid.js
        ├── package-lock.json
        ├── package.json
        ├── schema.js
        ├── controllers/
        │   ├── listing.js
        │   ├── review.js
        │   └── user.js
        ├── init/
        │   ├── data.js
        │   └── index.js
        ├── Models/
        │   ├── Listing.js
        │   ├── review.js
        │   └── user.js
        ├── public/
        │   ├── css/
        │   │   ├── rating.css
        │   │   └── styles.css
        │   └── js/
        │       └── script.js
        ├── uploads/
        ├── utils/
        │   └── wrapAsync.js
        └── views/
            ├── error.ejs
            ├── includes/
            │   ├── flash.ejs
            │   ├── footer.ejs
            │   └── navbar.ejs
            ├── layouts/
            │   └── boilerplate.ejs
            ├── listings/
            │   ├── edit.ejs
            │   ├── index.ejs
            │   ├── new.ejs
            │   └── show.ejs
            └── users/
                ├── login.ejs
                └── signup.ejs
```

## 🚀 Features
- Users can **browse** rental listings.
- Users can **sign up/login** to manage their own listings.
- Users can **add, edit, delete** their listings.
- Reviews system for users to leave feedback.
- Responsive design for **better user experience**.

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** EJS, Bootstrap, CSS
- **Authentication:** Passport.js
- **File Uploads:** Multer, Cloudinary

## 🔧 Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/findmystayy.git
   ```
2. Navigate to the project directory:
   ```sh
   cd bhanuteja072-findmystayy/MajorProject
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up your `.env` file with required API keys (MongoDB, Cloudinary, etc.).
5. Run the application:
   ```sh
   node app.js
   ```
6. Open the browser and go to `http://localhost:3000`

## 📜 License
This project is licensed under the MIT License.

---

🔗 **Connect with Me:** https://github.com/Bhanuteja072

