# MedFlow Project Structure

```
Agentic_Ai_Pharmacy/
│
├── app/                          # Next.js App Directory
│   ├── globals.css              # Global styles with theme variables
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Landing page with role selection
│   │
│   ├── admin/                   # Admin routes
│   │   ├── page.tsx            # Admin dashboard
│   │   └── ai-chat/
│   │       └── page.tsx        # Admin AI chat page
│   │
│   └── user/                    # User routes
│       ├── page.tsx            # User dashboard
│       └── ai-chat/
│           └── page.tsx        # User AI chat page
│
├── components/                  # React Components
│   ├── Sidebar.tsx             # Navigation sidebar (admin/user)
│   ├── Navbar.tsx              # Top navbar with theme toggle
│   ├── StatCard.tsx            # Statistics display card
│   ├── RecentActivity.tsx      # Activity feed component
│   ├── InventoryStatus.tsx     # Inventory status widget
│   ├── PrescriptionUpload.tsx  # Prescription upload interface
│   ├── MedicineRecommendations.tsx  # Medicine suggestions
│   ├── RecentOrders.tsx        # Order history display
│   └── AIChat.tsx              # AI chatbot interface
│
├── context/                     # React Context
│   └── ThemeContext.tsx        # Theme state management (light/dark)
│
├── backend/                     # Express.js Backend
│   ├── server.js               # Express server setup
│   └── routes/                 # API routes
│       ├── auth.js             # Authentication endpoints
│       ├── orders.js           # Order management
│       ├── prescriptions.js    # Prescription handling & OCR
│       ├── medicines.js        # Medicine CRUD operations
│       ├── ai.js               # AI chatbot & recommendations
│       └── analytics.js        # Analytics & reporting
│
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS with custom theme
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
└── LICENSE                     # License file
```

## Key Files Explained

### Frontend (Next.js)

#### `app/layout.tsx`
- Root layout component
- Wraps entire app with ThemeProvider
- Defines metadata

#### `app/page.tsx`
- Landing page
- Role selection (Admin/User)
- Feature highlights

#### `app/admin/page.tsx`
- Admin dashboard
- Revenue, orders, prescriptions stats
- Recent activity feed
- Inventory status
- OCR processing stats

#### `app/user/page.tsx`
- User dashboard
- Prescription upload
- Medicine recommendations
- Recent orders
- Personal statistics

#### `components/Sidebar.tsx`
- Navigation menu
- Different menus for admin/user roles
- Active route highlighting
- Theme-aware styling

#### `components/Navbar.tsx`
- Search functionality
- Notification bell
- Theme toggle button
- User profile display

#### `components/AIChat.tsx`
- Conversational interface
- Message history
- Typing indicators
- Auto-scrolling
- Theme support

#### `context/ThemeContext.tsx`
- Light/Dark theme management
- LocalStorage persistence
- Theme toggle functionality

### Styling

#### `tailwind.config.js`
- Custom color palette
- Primary Green: #0F6D57
- Sidebar Dark: #0A4F41
- Accent Green: #19A07D
- Background colors (light/dark)
- Card styles and shadows

#### `app/globals.css`
- CSS custom properties
- Base styles
- Transition effects
- Card glow effects

### Backend (Express)

#### `backend/server.js`
- Express server setup
- CORS configuration
- Route mounting
- Error handling
- Health check endpoint

#### `backend/routes/auth.js`
- User login
- User registration
- JWT token generation

#### `backend/routes/orders.js`
- Get all orders
- Get order by ID
- Create new order
- Update order status

#### `backend/routes/prescriptions.js`
- Get all prescriptions
- Upload prescription
- OCR processing simulation
- Approve/reject prescription

#### `backend/routes/medicines.js`
- Get all medicines
- Search medicines
- Add new medicine (admin)
- Update medicine (admin)
- Update stock levels

#### `backend/routes/ai.js`
- AI chatbot responses
- Medicine recommendations
- Symptom analysis

#### `backend/routes/analytics.js`
- Dashboard metrics
- Sales analytics
- Top selling medicines
- Revenue tracking

## Component Hierarchy

```
RootLayout (ThemeProvider)
│
├── Landing Page (/)
│   └── Role Cards (Admin/User)
│
├── Admin Dashboard (/admin)
│   ├── Sidebar (admin menu)
│   ├── Navbar
│   ├── StatCards (4x)
│   ├── RecentActivity
│   ├── InventoryStatus
│   └── OCR Stats
│
├── User Dashboard (/user)
│   ├── Sidebar (user menu)
│   ├── Navbar
│   ├── StatCards (4x)
│   ├── PrescriptionUpload
│   ├── RecentOrders
│   └── MedicineRecommendations
│
└── AI Chat (/admin/ai-chat, /user/ai-chat)
    ├── Sidebar
    ├── Navbar
    └── AIChat Component
```

## Theme System

### Light Mode
- Background: #F5F7F6
- Sidebar: #E6F2EF (soft green)
- Cards: #FFFFFF with shadow
- Text: #1F2937

### Dark Mode
- Background: #0B1B2B (deep navy)
- Sidebar: #0A4F41 (deep green)
- Cards: #0F2235 with glow
- Text: #E5E7EB

## API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`

### Orders
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders`
- `PATCH /api/orders/:id/status`

### Prescriptions
- `GET /api/prescriptions`
- `GET /api/prescriptions/:id`
- `POST /api/prescriptions/upload`
- `PATCH /api/prescriptions/:id/status`

### Medicines
- `GET /api/medicines`
- `GET /api/medicines/:id`
- `POST /api/medicines`
- `PUT /api/medicines/:id`
- `PATCH /api/medicines/:id/stock`

### AI
- `POST /api/ai/chat`
- `POST /api/ai/recommend`

### Analytics
- `GET /api/analytics/dashboard`
- `GET /api/analytics/sales`
- `GET /api/analytics/top-medicines`

## Scripts

```bash
npm run dev      # Start Next.js development server
npm run build    # Build for production
npm start        # Start production server
npm run server   # Start Express backend
```

## Environment Variables

```
PORT=5000
OPENAI_API_KEY=your_key_here
JWT_SECRET=your_secret_here
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development Workflow

1. Start backend: `npm run server` (port 5000)
2. Start frontend: `npm run dev` (port 3000)
3. Access landing page: http://localhost:3000
4. Choose Admin or User dashboard
5. Test features and API integration
6. Toggle themes with button in navbar
