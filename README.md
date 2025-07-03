# Portfolio Admin Dashboard

A portfolio admin panel built with **Express**, **Pug**, **MongoDB**, and **Foundation CSS**.  
It allows administrators to manage **projects** and **skills** with a modern, responsive UI.

---
# API Endpoints
The application exposes a simple JSON API to retrieve project data:

- GET (https://portfolio-admin-0pmi.onrender.com/admin/projects/api)

The application exposes a simple JSON API to retrieve Skills data:

- GET (https://portfolio-admin-0pmi.onrender.com/admin/skills/api)

Returns a JSON list of all projects. Useful for integration or frontend consumption.

---
## 🛠 Features

- Add, edit, and delete projects
- Add, edit, and delete skills
- Responsive layout using Foundation 6
- Clean admin interface using Pug templates
- MongoDB for data storage

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **Pug** templating engine
- **MongoDB** + Mongoose
- **Foundation 6.9.0** (Zurb)
- **SCSS** (compiled with `sass`)

---

## 🚀 Getting Started

1. Clone the repo  
git clone  https://github.com/fastodigama/portfolio-admin.git
cd portfolio-admin


2. Install dependencies  
npm install

3. Start MongoDB (locally or with Atlas)

4. Run the app  
npm run dev


5. Open in your browser  
[http://localhost:8899](http://localhost:8899)

---

## 💾 Folder Structure

public/ # CSS, JS, Foundation assets
views/ # Pug templates
routes/ # Express routes
models/ # Mongoose schemas
assets/scss/ # Custom SCSS with Foundation imports

---

## ✍️ Author

**Fadel Matar**  
[GitHub](https://github.com/fastodigama)

---

## 📄 License

This project is licensed under the MIT License.