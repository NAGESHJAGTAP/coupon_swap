# CouponSwap

## Description

CouponSwap is a **full-stack MERN web application** that enables users to **buy, sell, and trade digital coupons** securely and instantly.  
The platform is designed to maximize savings, streamline coupon management, and provide a seamless user experience across web and browser extension environments.

This project demonstrates **advanced full-stack development skills**, including secure authentication, real-time communication, responsive UI design, and browser extension integration.


## Deploy Link

```
https://couponswap.netlify.app/
```

## Features

- **User Authentication**: Secure login and signup with JWT tokens and bcrypt password hashing.
- **Coupon Management**: Buy, sell, and browse coupons with real-time updates.
- **User Dashboard**: Personalized dashboard for managing profiles, coupons, and transactions.
- **Browser Extension**: Chrome extension for quick coupon access and notifications.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS and Framer Motion animations.
- **Payment Integration**: Support for UPI, Paytm, Google Pay, and PhonePe icons for payment options.
- **Real-time Notifications**: Socket.io integration for live updates.
- **Email Services**: Nodemailer for user notifications and email verification.

## Tech Stack

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for API development.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB interactions.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: Password hashing for security.
- **Socket.io**: Real-time communication.
- **Nodemailer**: Email sending service.
- **Multer**: File upload handling.
- **CORS**: Cross-origin resource sharing.

### Frontend
- **React**: Component-based UI library.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **React Router DOM**: Client-side routing.
- **Framer Motion**: Animation library for smooth transitions.
- **React Toastify**: Notification system.
- **Lucide React & Heroicons**: Icon libraries.

### Browser Extension
- **JavaScript**: Core scripting.
- **Chrome Extension API**: For browser integration.
- **Manifest V3**: Extension configuration.

## Folder Structure

```
coupon_swap/
├── README.md
├── backend/
│   ├── Server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── couponController.js   # Coupon management
│   │   ├── loginController.js    # Login handling
│   │   └── profileController.js  # Profile management
│   ├── middleware/
│   │   └── validation.js         # Input validation
│   ├── models/
│   │   ├── Coupon.js             # Coupon schema
│   │   ├── login.js              # Login schema
│   │   ├── Profile.js            # Profile schema
│   │   └── User.js               # User schema
│   └── routes/
│       ├── authRoutes.js         # Authentication routes
│       ├── couponRoutes.js       # Coupon routes
│       ├── loginRoutes.js        # Login routes
│       └── profileRoutes.js      # Profile routes
├── CouponSwapExtension_Fixed/
│   ├── manifest.json             # Extension manifest
│   ├── background.js             # Background script
│   ├── content.js                # Content script
│   ├── popup.html                # Extension popup UI
│   ├── popup.js                  # Popup logic
│   ├── icon48.png                # Extension icon (48x48)
│   └── icon128.png               # Extension icon (128x128)
└── Frontend/
    ├── package.json              # Frontend dependencies
    ├── vite.config.js            # Vite configuration
    ├── tailwind.config.js        # Tailwind configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── index.html                # Main HTML file
    ├── src/
    │   ├── App.jsx               # Main React app
    │   ├── main.jsx              # React entry point
    │   ├── App.css               # Global styles
    │   ├── index.css             # Index styles
    │   ├── assets/
    │   │   ├── react.svg         # React logo
    │   │   └── components/
    │   │       ├── About.jsx     # About page
    │   │       ├── Body.jsx      # Main body component
    │   │       ├── Browse.jsx    # Browse coupons
    │   │       ├── Contact.jsx   # Contact page
    │   │       ├── CoupenSuccess.jsx # Success page
    │   │       ├── CouponVerification.jsx # Verification
    │   │       ├── FAQ.jsx       # FAQ page
    │   │       ├── Footer.jsx    # Footer component
    │   │       ├── Landingpage.jsx # Landing page
    │   │       ├── Login.jsx     # Login component
    │   │       ├── logo.jsx      # Logo component
    │   │       ├── Navbar.jsx    # Navigation bar
    │   │       ├── NotificationPage.jsx # Notifications
    │   │       ├── Privacy.jsx   # Privacy policy
    │   │       ├── ProfileSettings.jsx # Profile settings
    │   │       ├── Sell.jsx      # Sell coupons
    │   │       ├── Signin.jsx    # Sign-in component
    │   │       ├── Terms.jsx     # Terms of service
    │   │       └── UserDashboard.jsx # User dashboard
    └── public/
        ├── google-pay-icon.svg   # Payment icons
        ├── paytm-icon.svg
        ├── phonepe-icon.svg
        ├── upi-payment-icon.svg
        └── vite.svg              # Vite logo
```

## System Design Diagram

![System Design Diagram](https://via.placeholder.com/800x400?text=System+Design+Diagram)

The system architecture includes:
- **Frontend**: React app served via Vite, communicating with backend APIs.
- **Backend**: Express server handling business logic, authentication, and database interactions.
- **Database**: MongoDB for storing user data, coupons, and transactions.
- **Browser Extension**: Integrates with the web app for enhanced user experience.
- **Deployment**: Frontend on Netlify, backend on a server (e.g., Heroku or AWS).

## Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Screenshot)

### User Dashboard
![User Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard+Screenshot)

### Browser Extension Popup
![Browser Extension](https://via.placeholder.com/400x300?text=Browser+Extension+Popup)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with environment variables (e.g., MongoDB URI, JWT secret).
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Browser Extension Setup
1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select the `CouponSwapExtension_Fixed` folder.

## Usage

1. **Sign Up/Login**: Create an account or log in to access the platform.
2. **Browse Coupons**: View available coupons on the browse page.
3. **Buy/Sell Coupons**: Use the dashboard to manage transactions.
4. **Use Extension**: Install the extension for quick coupon access while browsing.

## Deployment

The application is deployed on Netlify. Access it at: [https://couponswap.netlify.app/](https://couponswap.netlify.app/)

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push to branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the ISC License.

## Contact

For questions or feedback, reach out via the contact page on the website.

 

