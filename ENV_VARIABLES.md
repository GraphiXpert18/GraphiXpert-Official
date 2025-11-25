# Environment Variables for Production

## Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_jwt_secret_key
```

## Frontend (Render Environment Variables)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

## Important Notes

1. **JWT_SECRET**: Generate a strong random string for production
   - Use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

2. **MONGO_URI**: Your MongoDB Atlas connection string
   - Current: mongodb+srv://rajaaysha78_db_user:W57SGo7avLPxlyWj@cluster0.cxdxmfj.mongodb.net/?appName=Cluster0

3. **NEXT_PUBLIC_API_URL**: Your deployed backend URL
   - Format: https://your-service-name.onrender.com/api
   - Must include /api at the end

## Security Checklist

- [ ] Never commit .env files to Git
- [ ] Use strong JWT_SECRET in production
- [ ] Verify MongoDB connection string is correct
- [ ] Update CORS origins to include production frontend URL
- [ ] Enable MongoDB Atlas IP whitelist (or allow all for Render)
