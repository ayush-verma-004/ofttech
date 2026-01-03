# Deployment Guide for OFT TECH

This project follows a **Unified Monorepo Deployment** strategy. The root directory contains an orchestration script that manages both the frontend (`portfolio`) and backend (`backend`) as a single deployable unit.

## 📂 Project Structure

-   `package.json` (Root): The Deployment Orchestrator.
-   `/backend`: Node.js/Express Server.
-   `/portfolio`: React (Vite) Frontend.

## 🚀 How It Works

When you deploy this repository, the root `package.json` takes control. The build process works like this:

1.  **Install**: Installs dependencies for *both* the Backend and Frontend.
2.  **Build**: Compiles the React Frontend into static files (`html`, `css`, `js`).
3.  **Merge**: Moves these static files into the Backend's `public` folder.
4.  **Serve**: The Node.js Backend serves both the API and the React App from one place.

---

## ☁️ Deployment Instructions (Render.com)

1.  **Create New Web Service**: Connect your GitHub repository.
2.  **Settings**:
    -   **Root Directory**: Leave defaults (e.g., `.` or empty).
    -   **Environment**: `Node`
    -   **Build Command**: `npm run build`
    -   **Start Command**: `npm start`
3.  **Environment Variables**:
    Add your standard variables in the Render dashboard:
    -   `NODE_ENV`: `production`
    -   `MONGO_URI`: (Your MongoDB Connection String)
    -   `JWT_SECRET`: (Your Secret Key)
    -   `CLOUDINARY_CLOUD_NAME`: ...
    -   `CLOUDINARY_API_KEY`: ...
    -   `CLOUDINARY_API_SECRET`: ...

---

## 💻 Local Development & Testing

You can use the root scripts to work on the project locally without switching folders.

### Install & Setup
```bash
npm install
```

### Run Full Production Build Locally (Windows)
To test if the deployment will work:
```powershell
npm run build:local
npm start
```

### Run for Development
To run backend only (dev mode):
```bash
npm run dev --prefix backend
```
*(For frontend dev, it's usually better to cd into `portfolio` and run `npm run dev` separately)*
