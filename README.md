
# 🌆 CivicSphere

**CivicSphere** is a MERN stack-based web platform focused on **Sustainable Cities and Communities**, aligned with **UN SDG Goal 11**. It empowers citizens and communities to collaborate on urban improvement through planning, issue reporting, resource sharing, and AI-driven emergency response.

---

## 🌟 Features

- 🔐 JWT-based authentication system
- 🗺️ Regional Planning using real-time location data
- 📍 Emergency Detection with severity levels using OpenWeather API and Gemini AI
- 🛠️ Issue Reporting with AWS S3 image uploads
- 📚 Resource Sharing across communities
- 📊 Project Planning for sustainability initiatives

---

## 📁 Folder Structure

```

CivicSphere/
├── frontend/         # React.js + Tailwind CSS
├── backend/          # Node.js + Express.js + MongoDB
├── README.md
└── .env.example

````

---

## 🧪 Installation & Setup

### ⚙️ 1. Clone the Repository

```bash
git clone https://github.com/akashsiripuram/CivicSphere.git
cd CivicSphere
````

---

### 🚀 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following structure:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret

AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=bobinnovathon
AWS_BUCKET_URL=https://bobinnovathon.s3.eu-north-1.amazonaws.com

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

---

### 🌐 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🧾 .env Example

```env
# Backend Environment Variables

PORT=8000

# MongoDB
MONGODB_URI=mongodb+srv://CivicSphere:CivicSphere@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=secretkey

# AWS S3 for image storage
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=bobinnovathon
AWS_BUCKET_URL=https://bobinnovathon.s3.eu-north-1.amazonaws.com

# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 👨‍💻 Contributors

| Name            | GitHub Profile                                       |
| --------------- | ---------------------------------------------------- |
| Siri Devoju     | [@siridevoju](https://github.com/siridevoju)         |
| Akash Garine    | [@akashgarine](https://github.com/akashgarine)       |
| Akash Siripuram | [@akashsiripuram](https://github.com/akashsiripuram) |

---

## 🙌 Acknowledgements

* [United Nations SDGs](https://sdgs.un.org/goals) – for global sustainable development goals
* [OpenWeather API](https://openweathermap.org/api) – for real-time weather data
* [Gemini AI](https://deepmind.google/technologies/gemini/) – for AI-driven emergency detection
* [AWS S3](https://aws.amazon.com/s3/) – for scalable and secure image storage

---

## 📬 Feedback

Have suggestions, found a bug, or want to contribute?

Feel free to [open an issue](https://github.com/akashsiripuram/CivicSphere/issues) or submit a pull request.

Let’s build smarter, safer, and more sustainable cities together 🌍🏙️


