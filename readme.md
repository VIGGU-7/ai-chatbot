# AI Chatbot

 conversational AI website developed using **Node.js**, **Express**, **MongoDB**, and **React (Vite)**, integrated with Ollama and a fine-tuned model.
## 🎬 Demo Video

[Watch on YouTube](https://youtu.be/GDYWtzpkEJg)

## demo images


<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/d9c7f627-f95d-45f3-b4ea-108f8d737f76" />
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/911f6c7d-043c-46c1-8241-2bc7d87a0a78" />
<img width="1918" height="931" alt="Screenshot 2025-07-21 114544" src="https://github.com/user-attachments/assets/0324aeed-6f4e-4897-9c99-2cccba396ada" />
<img width="1919" height="936" alt="Screenshot 2025-07-21 113646" src="https://github.com/user-attachments/assets/c7740132-5102-457d-81b9-1b977767e123" />
<img width="1919" height="1032" alt="Screenshot 2025-07-21 113545" src="https://github.com/user-attachments/assets/82abff64-560e-423d-986f-f797fde2d4d2" />


## Features

- JWT-based authentication
- Add your own AI models
- Search previous chat sessions
- Chat with the AI chatbot
- Chat with your custom models


## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

### Frontend
- React (with Vite)
- Axios
- Tailwind CSS

---
### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/VIGGU-7/ai-chatbot.git
cd ai-chatbot
```

#### 2. Install dependencies

**Backend:**
```sh
cd backend
npm install
```

**Frontend:**
```sh
cd ../frontend
npm install
```



## ⚙️ Environment Variables

### 🔐 Backend `.env`

Create a `backend/.env` file and add:

```env
PORT=8080
MONGO_URI="mongodb://localhost:27017/your_db_name
JWT_SECRET="your_jwt_secret"
NODE_ENV="devolopment"
model="your_model_name api link"
modelname="your_model_name"
```
#### 4. Start the Application

**Backend:**
```sh
npm run dev
```

**Frontend:**
```sh
npm start
```

The frontend runs on [http://localhost:5173](http://localhost:5173)  
The backend runs on [http://localhost:8080](http://localhost:8080)

## Usage

- Register a new account or log in.
- start chating with your model !.


## Project Structure

```
blog-application/
├── backend/ # Express backend
├── frontend/ # React frontend
├── README.md # Project README
└── .gitignore # Git ignored files
```

## Customization

- To enable/disable real-time features, adjust socket logic in the context files.
- Update styles in `frontend/src` as needed.
