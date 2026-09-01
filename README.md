# MedVista Hospital Management System

A comprehensive hospital management system built with Next.js 14, Prisma, and PostgreSQL.

## Features

### For Admin
- Dashboard with analytics and statistics
- Doctor and department management
- Patient management with medical records
- Appointment scheduling and tracking
- Billing and payment processing
- Staff and inventory management
- Reports and analytics

### For Doctors
- Personal dashboard with schedule
- Patient management and medical records
- Prescription writing and management
- Lab order creation
- Referral management
- Surgery scheduling

### For Patients
- Health dashboard with summary
- Online appointment booking
- Medical records access
- Prescription viewing
- Bill payment
- Lab results viewing
- Insurance management
- Telemedicine consultations

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **UI Components:** Radix UI, shadcn/ui
- **Charts:** Recharts
- **Forms:** React Hook Form, Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tejaswar-lionix/medvista-hospital-system.git

# Navigate to project directory
cd medvista-hospital-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/medvista"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   │   ├── admin/       # Admin dashboard
│   │   ├── doctor/      # Doctor dashboard
│   │   └── patient/     # Patient portal
│   ├── api/             # API routes
│   ├── departments/     # Public department pages
│   └── doctors/         # Public doctor pages
├── components/
│   ├── ui/              # UI components
│   ├── forms/           # Form components
│   ├── charts/          # Chart components
│   ├── dashboard/       # Dashboard components
│   └── email/           # Email templates
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # TypeScript types
```

## Default Credentials

### Admin
- Email: admin@medvista.com
- Password: admin123

### Doctor
- Email: dr.priya@medvista.com
- Password: password123

### Patient
- Email: patient@example.com
- Password: password123

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
