# Setup Guide

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   NODE_ENV=development
   ```

4. Seed the database with mock products:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## CORS Configuration

The backend is now configured to allow all origins in development mode. This should resolve CORS errors when running the frontend on `http://localhost:5173`.

## Mock Data

Mock product data is available in `backend/mockProducts.json`. Run `npm run seed` in the backend directory to populate your database with 20 sample products.

