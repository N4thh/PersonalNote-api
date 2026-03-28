# Personal-Note-App  

## A Simple & Modern Personal Note Application

A clean and modern personal note-taking web application that allows users to manage their notes efficiently with authentication and full CRUD functionality.

---

##  Features

* User-friendly interface  
* User Authentication (Sign Up / Sign In)  
* Create, Edit, and Delete Notes  
* Responsive design for all devices  
* PostgreSQL Database Integration  

---

##  Features To Be Added

Check [Issues](https://github.com/N4thh/PersonalNote-api/issues) to contribute to this repository.

* Search & Filter Notes  
* Tags & Categories  
* Reminder / Notification System  
* Drag & Drop Note Reordering  
* Dark / Light Mode Toggle  

---

##  Tech Stack

* Next.js  
* TypeScript  
* Tailwind CSS  
* PostgreSQL  
* Prisma ORM  
* Lucide React (Icons)  
* Google Fonts (Poppins)  

---

##  References

* Fonts: [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins)  
* Icons: [Lucide React](https://lucide.dev/)  
* Database: PostgreSQL  
* UI/UX Inspiration: [Figma AI Design](https://www.figma.com/make/w1Cji778Wlelmg1PwCF1xH/Personalized-Note-Taking-App--Community-?p=f&t=qA2HgBlmJFfR7VSz-0)  

---
## Installation Guide

Follow the steps below to run this project locally.

> Make sure PostgreSQL is installed and running before starting.

## Clone the Repository

``bash
git clone https://github.com/N4thh/PersonalNote-api.git
cd PersonalNote-api
cd my-app

### Install Dependencies
npm install

### Setup Environment Variables
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/personalnote"
JWT_SECRET="your_secret_key"

### Setup Database (Prisma)
npx prisma migrate dev
npx prisma generate

(Optional) Open Prisma Studio:
npx prisma studio

### Run the Development Server
npm run dev

---

##  Website Demo

![Sign In](./images/signin.png)
![Sign Up](./images/signup.png)
![Dashboard](./images/dashboard.png)
![Create Note](./images/createnote.png)
![Edit Note](./images/editnote.png)

---

##  Author

**Nguyen Nhat Anh**  
- Email: nhatahh2003@gmail.com  
- LinkedIn: https://www.linkedin.com/in/nhật-anh-nguyễn-508018324/  
- GitHub: https://github.com/N4thh  
