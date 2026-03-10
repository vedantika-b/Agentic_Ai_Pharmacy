# MedFlow Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git (optional)

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd c:\Users\HP\Agentic_Ai_Pharmacy
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- TailwindCSS
- Lucide Icons
- Express
- CORS
- and more...

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
copy .env.example .env
```

Or manually create `.env` and add:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Note:** The system works without OpenAI API key for now (using mock responses). Add it later for real AI functionality.

### 4. Run the Application

You need to run both frontend and backend:

#### Terminal 1 - Frontend (Next.js)
```bash
npm run dev
```
This starts the Next.js app on `http://localhost:3000`

#### Terminal 2 - Backend (Express)
```bash
npm run server
```
This starts the API server on `http://localhost:5000`

### 5. Access the Application

Open your browser and navigate to:
- **Landing Page:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **User Dashboard:** http://localhost:3000/user
- **API Health Check:** http://localhost:5000/health

## Quick Start Guide

### For Admin Users

1. Go to http://localhost:3000
2. Click "Admin Dashboard"
3. Explore:
   - Dashboard overview with stats
   - Recent activity feed
   - Inventory status
   - Click "AI Chat" in sidebar for chatbot

### For Regular Users

1. Go to http://localhost:3000
2. Click "User Dashboard"
3. Explore:
   - Upload prescription
   - View medicine recommendations
   - Check recent orders
   - Click "AI Pharmacist" for assistance

## Theme Switching

Click the **Moon/Sun icon** in the top-right navbar to toggle between light and dark modes.

## Development Tips

### Hot Reload
Both frontend and backend support hot reloading. Changes will reflect automatically.

### Port Configuration
If ports 3000 or 5000 are in use, you can change them:
- Frontend: Next.js will prompt for an alternative port
- Backend: Change `PORT` in `.env` file

### API Testing
You can test API endpoints using:
- Browser (for GET requests)
- Postman
- Thunder Client (VS Code extension)
- cURL

Example:
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/medicines
```

## Troubleshooting

### Problem: Port already in use
**Solution:** 
- Close other applications using ports 3000 or 5000
- Or change ports in configuration

### Problem: Module not found errors
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Problem: TypeScript errors
**Solution:**
```bash
npm run build
```
This will show any TypeScript issues that need fixing.

### Problem: Styling not applied
**Solution:**
Ensure Tailwind CSS is working:
```bash
npm run dev
```
Check browser console for CSS loading errors.

## Building for Production

### Build Frontend
```bash
npm run build
npm start
```

### Run Backend in Production
```bash
NODE_ENV=production npm run server
```

## Project Structure Overview

```
Agentic_Ai_Pharmacy/
├── app/              # Next.js pages
├── components/       # React components
├── context/          # Theme context
├── backend/          # Express API
├── package.json      # Dependencies
└── tailwind.config.js # Styling config
```

## Features to Test

### Admin Dashboard
✅ View statistics cards
✅ Check recent activity
✅ Monitor inventory levels
✅ View OCR processing stats
✅ Toggle dark/light mode
✅ Access AI chat

### User Dashboard
✅ Upload prescription image
✅ View medicine recommendations
✅ Check recent orders
✅ View order status
✅ Chat with AI pharmacist

### AI Chat
✅ Send messages
✅ Receive responses
✅ View message history
✅ Typing indicators

## Next Steps

1. **Integrate Real OCR:** Replace mock OCR with Tesseract.js or cloud OCR
2. **Add OpenAI:** Configure OpenAI API for intelligent responses
3. **Database Setup:** Connect MongoDB or PostgreSQL
4. **Authentication:** Implement JWT authentication
5. **Payment Gateway:** Integrate Stripe or PayPal
6. **Deployment:** Deploy to Vercel (frontend) and Railway/Heroku (backend)

## Get Help

If you encounter issues:
1. Check browser console for errors
2. Check terminal output for server errors
3. Verify all dependencies are installed
4. Ensure ports are available
5. Review PROJECT_STRUCTURE.md for architecture details

---

**Happy Coding! 🚀**

Built with ❤️ for modern pharmacy management
