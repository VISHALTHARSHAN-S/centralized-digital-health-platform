# Centralized Digital Health Management System (CHMS)

A modern MERN-stack healthcare platform designed to centralize citizen health records, enable secure access for patients, doctors, and administrators, and streamline digital healthcare workflows through role-based interfaces.

## Overview

CHMS is a full-stack digital health management application that provides:

- Unique Health ID-based citizen profiles
- Secure patient medical record management
- Doctor-facing healthcare workflows
- Admin monitoring and analytics dashboards
- Digital health card and report management

The platform is structured to support a national-scale healthcare ecosystem with a clean, modular, and scalable architecture.

## Key Features

- User registration and authentication for patients, doctors, and admins
- Role-based access control
- Patient dashboard with medical summary and health card view
- Appointment booking and management
- Medical record, prescription, and report handling
- Hospital and doctor directory support
- Notification system foundation
- Responsive UI built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary integration for medical reports
- Multer for file uploads
- Helmet, CORS, and Morgan

## Project Structure

```text
centralized-digital-health-platform/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                  # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   └── package.json
├── package.json             # Root scripts
└── LICENSE
```

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js 18+ recommended
- npm or yarn
- MongoDB running locally or accessible remotely

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd centralized-digital-health-platform
```

### 2. Install dependencies

```bash
npm run install:all
```

This installs dependencies for both the root project, backend, and frontend.

## Environment Variables

Create a `.env` file inside the `server` directory with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/chms
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

You may also configure Cloudinary variables if you want uploaded reports to be stored in the cloud:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Frontend

From the project root:

```bash
npm run client
```

Or directly inside the client folder:

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Running the Backend

From the project root:

```bash
npm run server:dev
```

Or directly inside the server folder:

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## Running the Complete Project

To run both frontend and backend together:

```bash
npm run dev
```

This uses concurrently to start both services in parallel.

## API Base URL

The frontend is configured to use the following API base URL by default:

```text
/api/v1
```

If needed, you can override it in the frontend environment using:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Screenshots

Placeholder screenshots will be added here as the UI matures.

### Landing Page
![Landing Page Placeholder](https://via.placeholder.com/800x450?text=CHMS+Landing+Page)

### Patient Dashboard
![Patient Dashboard Placeholder](https://via.placeholder.com/800x450?text=Patient+Dashboard)

### Doctor/Admin Views
![Admin/Doctor View Placeholder](https://via.placeholder.com/800x450?text=Doctor+Admin+Views)

## Future Enhancements

Planned improvements include:

- Full doctor and admin dashboards
- Advanced analytics and reporting modules
- Real-time notifications and messaging
- Telemedicine integration
- Mobile-first enhancements
- AI-based clinical insights and document summarization
- Multi-language and accessibility support

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change.
