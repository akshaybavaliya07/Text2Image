# 🖼️ Text2Image

**Text2Image** is an AI-powered web application that allows users to generate images from text prompts using the [ClipDrop API](https://clipdrop.co/apis). It features secure user authentication, email verification, credit-based usage, password recovery, and payment integration using Razorpay.

## 🔗 Live Demo

[👉 Visit Live App](#) 

---

## ✨ Features

### 🔐 Authentication & Security
- **User Signup & Email Verification**: A verification link is sent to the user’s email on signup.
- **Login with JWT**: Users receive a token stored in `localStorage`, auto-verified on future visits.
- **Password Hashing**: User passwords are securely hashed using **bcrypt** before storing in the database.
- **Forgot Password**: Users receive a reset link via email to securely update their password.

### 🎁 Credits System
- **Free Credits**: New users get **5 free credits** after signup and login.
- **Credit Deduction**: 1 credit is deducted per image generation.
- **Razorpay Integration**: Users can purchase more credits through Razorpay. On successful payment, credits are instantly updated.

### 🧠 Image Generation
- **Prompt-Based Input**: Users enter a text prompt and get an AI-generated image.
- **ClipDrop API**: Powerful image generation based on prompt.
- **Shimmer UI**: Loading animation displayed during image generation.
- **Image Download**: Users can download generated images.
- **Smooth Animations**: Interactive and engaging UI enhanced with [Framer Motion](https://www.framer.com/motion/)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- Nodemailer for Emails

### APIs & Services
- [ClipDrop API](https://clipdrop.co/apis) (Image Generation)
- [Razorpay](https://razorpay.com) (Payment Integration)