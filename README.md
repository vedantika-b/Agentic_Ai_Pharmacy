# MedFlow - AI-Powered Pharmacy Dashboard System

A modern, full-stack pharmacy management system with AI capabilities, featuring prescription OCR scanning, intelligent chatbot assistance, and comprehensive inventory management.

## 🌟 Features

### Admin Dashboard
- 📊 Real-time analytics and revenue tracking
- 📦 Inventory management with low-stock alerts
- 📋 Order management and tracking
- 💊 Prescription approval system
- 🤖 AI-powered analytics
- 📈 Sales and performance metrics

### User Dashboard
- 📸 Prescription upload with OCR scanning
- 💬 AI pharmacist chatbot assistance
- 🛒 Medicine ordering system
- 📦 Order tracking
- 💊 Personalized medicine recommendations
- ⭐ Customer satisfaction tracking

### AI Features
- 🔍 Prescription OCR (Optical Character Recognition)
- 💬 Conversational AI chatbot for medication queries
- 🎯 Intelligent medicine recommendations
- 📊 Predictive inventory management

## 🎨 Design

### Light Mode
- Clean, modern medical SaaS dashboard
- Soft green sidebar (#E6F2EF)
- White cards with soft shadows
- Primary green accent (#0F6D57)

### Dark Mode
- Deep navy background (#0B1B2B)
- Dark blue cards (#0F2235)
- Deep green sidebar (#0A4F41)
- Green accent glow effects

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TailwindCSS** - Styling
- **Lucide Icons** - Icon library
- **TypeScript** - Type safety

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **OpenAI API** - AI chatbot (integration ready)
- **OCR System** - Prescription scanning (integration ready)

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd Agentic_Ai_Pharmacy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   - OPENAI_API_KEY
   - Other configuration variables

4. **Run the development server**

   Frontend (Next.js):
   ```bash
   npm run dev
   ```

   Backend (Express):
   ```bash
   npm run server
   ```

5. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 🚀 Usage

### Admin Access
Navigate to `/admin` to access:
- Dashboard overview
- Order management
- Inventory control
- Prescription approvals
- Analytics
- AI Chat assistant

### User Access
Navigate to `/user` to access:
- Personal dashboard
- Prescription upload
- Medicine browsing
- Order tracking
- AI Pharmacist chat

## 📱 Pages

- `/` - Landing page with role selection
- `/admin` - Admin dashboard
- `/admin/ai-chat` - Admin AI assistant
- `/user` - User dashboard
- `/user/ai-chat` - User AI pharmacist

## 🎨 Theme Colors

```css
Primary Green: #0F6D57
Sidebar Dark: #0A4F41
Accent Green: #19A07D
Background Light: #F5F7F6
Background Dark: #0B1B2B
Card Light: #FFFFFF
Card Dark: #0F2235
Text Dark: #1F2937
Text Light: #E5E7EB
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions/upload` - Upload prescription
- `PATCH /api/prescriptions/:id/status` - Approve/reject

### Medicines
- `GET /api/medicines` - Get all medicines
- `POST /api/medicines` - Add new medicine
- `PATCH /api/medicines/:id/stock` - Update stock

### AI
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/recommend` - Get medicine recommendations

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/sales` - Sales data
- `GET /api/analytics/top-medicines` - Top selling medicines

## 🧩 Components

- **Sidebar** - Navigation menu
- **Navbar** - Top bar with search and user profile
- **StatCard** - Statistics display card
- **RecentActivity** - Activity feed
- **InventoryStatus** - Stock level indicators
- **PrescriptionUpload** - File upload with OCR
- **MedicineRecommendations** - AI-powered suggestions
- **RecentOrders** - Order history
- **AIChat** - Conversational chatbot interface

## 📄 License

See LICENSE file for details.

## 👨‍💻 Development

Built with ❤️ using modern web technologies for a seamless pharmacy management experience.

## 🔮 Future Enhancements

- Real-time notifications
- Payment gateway integration
- SMS/Email alerts
- Mobile app (React Native)
- Advanced analytics dashboard
- Multi-language support
- Drug interaction checker
- Telemedicine integration

---

**MedFlow** - Simplifying pharmacy management with AI
