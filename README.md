# 💬 MyChat – Real-Time Chat Application (MERN + Socket.io)

🚀 MyChat is a full-stack real-time chat application built using the MERN stack and Socket.io, designed to replicate core features of modern messaging platforms like WhatsApp.

This project was built from scratch as a personal learning & practice project, with a strong focus on real-time communication, scalable backend architecture, authentication, and responsive UI design.
> ⚠️ **Disclaimer**  
> This project is created for **learning and skill-development purposes only**.  
> It is **not intended for real-world production use** without additional security, validation, and scalability improvements.


## 👨‍💻 Author

Dev Karwa

🎓 MCA Student | MERN Stack Developer

📍 India

This is a personal project created to demonstrate full-stack development skills and real-time system design.

## 🌐 Live Demo

* 🔗 Frontend (Live App): 
👉 https://chat-app-nu-mauve-82.vercel.app

* 🔗 Backend API:
👉 https://hospital-l89k.onrender.com

>  ⚠️ **Note:** Free hosting services (Render/Vercel) may put the server to sleep.
> First request may take a few seconds.

## ✨ Key Features
### 🔐 Authentication & Security

- User Registration & Login

- JWT-based Authentication

- Protected Routes (Frontend & Backend)

- Password Hashing using bcrypt

### 💬 Real-Time Chat (Core Highlight)

- One-to-One Real-Time Messaging

- Socket.io powered live communication

- Chat rooms based on unique Chat IDs

- Messages delivered instantly without refresh

- Typing Indicator (real-time)

### 🧑‍🤝‍🧑 Chat Management

- Fetch all users except logged-in user

- Start chat by clicking a user

- Fetch messages for selected chat

- Latest message updates dynamically

### 📱 Responsive UI

- Fully mobile-responsive design

- Desktop: Sidebar + Chat Window

- Mobile: WhatsApp-style navigation

- Clean UI with proper UX flow

### ⚙️ Backend Architecture

- RESTful APIs

- Modular MVC structure

- MongoDB schemas with relations

- Error handling & validation



## 🛠️ Tech Stack Used
### Frontend

- React.js

- React Router DOM

- Context API (Global State Management)

- Axios

- CSS Modules

- Responsive Design (Media Queries)

### Backend

- Node.js

- Express.js

- MongoDB with Mongoose

- JWT (jsonwebtoken)

- bcryptjs

- Socket.io

### Database & Hosting

- MongoDB Atlas (Cloud Database)

- Render (Backend Hosting)

- Vercel (Frontend Hosting)

  

## 🧠 Key Technical Concepts Demonstrated

- Real-time communication using WebSockets

- Chat room based socket architecture

- Authentication flow with JWT

- Secure password storage & verification

- REST API design & integration

- Frontend–Backend synchronization

- State management in real-time apps

- Debugging production-level socket issues

- Mobile-first responsive design

## 📁 Project Structure
Directory structure:
``` text
└── devkarwa28-chatapp/
    ├── client/
    │   ├── README.md
    │   ├── package.json
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.css
    │       ├── App.js
    │       ├── index.css
    │       ├── index.js
    │       ├── socket.js
    │       ├── components/
    │       │   ├── ProtectedRoute.jsx
    │       │   ├── ChatWindow/
    │       │   │   ├── ChatWindow.jsx
    │       │   │   └── chatwindow.module.css
    │       │   └── Sidebar/
    │       │       ├── Sidebar.jsx
    │       │       └── sidebar.module.css
    │       ├── context/
    │       │   ├── AuthContext.jsx
    │       │   └── ChatContext.jsx
    │       ├── pages/
    │       │   ├── ChatPage.jsx
    │       │   ├── Login.jsx
    │       │   ├── login.module.css
    │       │   └── Register.jsx
    │       └── services/
    │           ├── chatServices.js
    │           ├── messageServices.js
    │           └── userServices.js
    └── server/
        ├── app.js
        ├── package.json
        ├── controller/
        │   ├── authController.js
        │   ├── chatController.js
        │   ├── messageController.js
        │   └── userController.js
        ├── db/
        │   └── dbConfig.js
        ├── middleware/
        │   └── authMiddleware.js
        ├── models/
        │   ├── chatModel.js
        │   ├── messageModel.js
        │   └── userModel.js
        └── routes/
            ├── AuthRouting.js
            ├── chatRouting.js
            ├── messageRouting.js
            └── userRouting.js

``` 
## 🧪 How to Run Locally
### Backend
```
cd server
npm install
npm run dev
```

### Frontend
```
cd client
npm install
npm start
```

## 🎯 Purpose of This Project

This project was built to:

- Deepen understanding of real-time applications

- Practice full-stack MERN development

- Learn Socket.io, authentication, and state management

- Create a strong portfolio project for interviews

 > **Note** This is not a tutorial copy, but a hands-on project built by debugging real issues, handling edge cases, and improving architecture step by step.

## 🏆 What This Project Shows About Me

- Strong understanding of MERN stack
- Ability to build real-time systems
- Debugging & problem-solving skills
- Clean, scalable code structure
- Production deployment experience

## 📩 Contact

If you’d like to discuss this project or opportunities:

- GitHub: https://github.com/your-username

- LinkedIn: https://linkedin.com/in/your-profile
---

 ⭐ If you find this project interesting, don’t forget to star the repository! ⭐
