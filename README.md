# GraphiXpert Website

Full-stack portfolio website with admin dashboard for managing projects.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **File Upload**: Multer with Cloudinary
- **Deployment**: Render

## Features

- Portfolio management with image/video uploads
- Admin dashboard with authentication
- Contact form with enquiry management
- Services showcase
- Responsive design

## Local Development

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd GraphiXpert
```

2. Set up environment variables:

**Backend** (`server/.env`):
```bash
cp server/.env.example server/.env
# Edit server/.env with your actual values
```

**Frontend** (`client/.env.local`):
```bash
cp client/.env.example client/.env.local
# Edit client/.env.local with your actual values
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Seed Admin User

```bash
cd server
node seedAdmin.js
```

Default credentials:
- Email: `admin@graphixpert.com`
- Password: `admin123`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Render.

### Quick Deploy to Render

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect `render.yaml`
4. Configure environment variables as described in DEPLOYMENT.md
5. Deploy!

## Environment Variables

### Server
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `CLIENT_URL` - Frontend URL (for CORS)
- `PORT` - Server port (default: 5007)

### Client
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Project Structure

```
GraphiXpert/
├── client/              # Next.js frontend
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # React components
│   │   └── lib/        # Utilities and config
│   └── package.json
├── server/              # Express backend
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── package.json
└── render.yaml         # Render deployment config
```

## License

ISC

