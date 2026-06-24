# HomeAway

  A full-stack property rental platform built with Next.js, featuring authentication, property listings, booking system, payments, and admin dashboard.

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable components built with Radix UI
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Leaflet / React-Leaflet** - Interactive maps
- **Recharts** - Chart library for admin dashboard
- **next-themes** - Dark mode support
- **react-day-picker** - Date picker component
- **react-share** - Social sharing buttons

### Backend & Services
- **Clerk** - Authentication & user management
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Supabase** - Image/file storage
- **Stripe** - Payment processing
- **Axios** - HTTP client

## Features

### Public
- Browse property listings with category filters
- Search properties by name/tagline
- View property details with image galleries
- Interactive maps showing property locations
- Dark/light mode toggle

### Authenticated Users
- Create and manage profile
- Upload profile image
- Create, edit, and delete property rentals
- Upload property images
- Add properties to favorites
- Book properties with date selection
- Secure checkout with Stripe
- View booking history
- Leave reviews and ratings
- View reservation statistics

### Admin
- Dashboard with user/property/booking statistics
- Charts showing booking trends over 6 months

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes (Stripe webhooks)
│   ├── bookings/           # User bookings
│   ├── checkout/           # Stripe checkout
│   ├── favorites/          # Favorite properties
│   ├── profile/            # User profile management
│   ├── properties/         # Property listings & details
│   ├── rentals/            # Manage rental properties
│   ├── reservations/       # View reservations
│   └── reviews/            # User reviews
├── components/             # React components
│   ├── admin/              # Admin-specific components
│   ├── booking/            # Booking form components
│   ├── card/               # Property & booking cards
│   ├── form/               # Form components
│   ├── home/               # Homepage components
│   ├── navbar/             # Navigation components
│   ├── properties/         # Property detail components
│   ├── reservations/       # Reservation components
│   ├── reviews/            # Review components
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── prisma/                 # Database schema
├── public/                 # Static assets
└── utils/                  # Server actions, helpers, types
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account (for auth)
- Supabase account (for image storage)
- Stripe account (for payments)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yuliussetyawan/home-away
cd home-away-github
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Fill in your credentials:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/profile/create
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/profile/create
NEXT_PUBLIC_WEBSITE_URL=

# Database
DATABASE_URL=""
DIRECT_URL=""

# Supabase
SUPABASE_URL=
SUPABASE_KEY=

# Admin
ADMIN_USER_ID=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

4. Initialize database
```bash
npx prisma db push
```

5. Run development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### Models
- **Profile** - User profiles linked to Clerk
- **Property** - Rental property listings
- **Favorite** - User's saved properties
- **Review** - Property reviews and ratings
- **Booking** - Reservation records

## API Routes

- `POST /api/payment` - Create Stripe checkout session
- `POST /api/confirm` - Confirm payment webhook

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Generate Prisma client and build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

See `.env.example` for all required environment variables.

