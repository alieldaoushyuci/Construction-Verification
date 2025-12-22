# Contractor Certificate Scanner App

## Project Overview

The **Contractor Certificate Scanner App** is designed to simplify the verification and management of contractor certifications.  
The app will allow users to **scan or upload certification documents** (no QR/barcodes required) and **validate their expiration dates** to ensure compliance.

### Core Verification Categories

The app will verify and track expiration for:

- Contractor Name
- DBA (Doing Business As)
- Corporation / LLC
- Contractor License
- Bond
- Workers Compensation
- General Liability
- Umbrella Coverage
- Auto Insurance
- Forklift Certifications
- Scissor Lift Certifications
- OSHA Certifications
- _Other custom certifications as needed_

## Publishing & Deployment

**How hard is it to publish on the App Store?**  
Publishing will involve:

- Apple Developer Account setup ($99/year)
- App review and compliance process
- Estimated 1–2 weeks from submission to approval
-

### Front-End Setup

(To be defined)

- Framework: React
- Core screens: Sign in, Dashboard, Upload, Document Details, Account Details

### Back-End Setup

(To be defined)

- Cloud storage for document uploads
- Database for tracking and verification
- API endpoints for validation and user data

---

## Time & Effort Estimates

### Sprint 1: Proof of Concept (1 Week) -- DONE

- Setup GitHub Repository
- Create website skeleton (tech not required to be finalized yet)
- Draft and approve **Budget Proposal Document**

### Sprint 2: Front-End Development (2 Weeks)

- Build core UI components
- Transfer website prototype to app
- Create app pages and format
- Implement basic navigation and styling
- Research Insurance API's for 3rd party sign-in

### Sprint 3: Insurance verification and local account creation (3 weeks)

- Integrate insurance sign in capabilities
- Create database schema to handle account creation
- Store metadata and expiration data locally

### Sprint 4: Back-End Validation & Logic (4 Weeks)

- Build API endpoints for document storage & retrieval
- Implement validation logic for expiration dates
- Connect front-end to back-end

### Sprint 5: Testing & Deployment (3 Weeks)

- QA testing and bug fixing
- Prepare deployment build
- Publish to app store and/or web

---

## Starting the Backend

1. Navigate to the backend folder
   ```bash
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the backend server
   ````bash
   npm start
    ```
   The backend will run at: http://localhost:5001
   ````

## Starting the Frontend (Mobile App)

### Prerequisites

- Node.js installed
- Expo Go app installed on your phone (available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Setup Instructions

1. Navigate to the app folder

   ```bash
   cd my-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the Expo development server
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

### Accessing the App on Your Phone

After running `npm start`, you'll see a QR code in your terminal and a development menu. Choose one of these methods:

#### Option 1: Using Expo Go App (Recommended for Development)

1. Open the **Expo Go** app on your phone
2. **For iOS (iPhone):**

   - Open the Camera app
   - Point it at the QR code in your terminal
   - Tap the notification that appears
   - The app will open in Expo Go

   **For Android:**

   - Open the Expo Go app
   - Tap "Scan QR code"
   - Point your camera at the QR code in your terminal
   - The app will load

#### Option 2: Using Development Build

- Press `i` in the terminal to open iOS Simulator (Mac only)
- Press `a` in the terminal to open Android Emulator
- Press `w` in the terminal to open in web browser

#### Option 3: Direct Connection (Same Network Required)

- Make sure your phone and computer are on the same Wi-Fi network
- The QR code will automatically use your local network IP
- Scan the QR code with Expo Go as described above

### Troubleshooting

**Can't connect to the development server?**

- Ensure your phone and computer are on the same Wi-Fi network
- Check that your firewall isn't blocking the connection
- Try using the "Tunnel" connection type (press `s` in the terminal, then select "Tunnel")

**App not loading?**

- Make sure you have the latest version of Expo Go installed
- Try clearing the Expo Go app cache
- Restart the development server (`Ctrl+C` then `npm start` again)

---

## Project Structure

This section explains the organization of the mobile app files in the `my-app/` directory.

### Directory Structure

```
my-app/
│
├── components/        # Reusable UI components (create when needed)
│
│
├── services/          # External services and API clients
│   └── supabase.js   # Supabase database client
│
├── assets/           # Static assets (images, fonts, etc.)
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
│
├── App.js            # Root component
├── index.js         # Entry point (see index.js for explanation)
├── app.json         # Expo configuration
└── package.json     # Dependencies and scripts
```

### Folder Purposes

#### `/components`

Reusable UI components that can be used across multiple screens.

- Small, focused components
- Example: `Button.jsx`, `Input.jsx`, `Card.jsx`

#### `/services`

External service integrations and API clients.

- Database clients (Supabase)
- Third-party API integrations
- Authentication services

#### `/assets`

Static files like images, fonts, and other media.

- Icons
- Splash screens
- Images used in the app

---

## Repository Structure

```
/Construction-Verification
├── my-app/           # Mobile app (React Native/Expo)
├── backend/          # API and data validation (if applicable)
├── docs/             # Documentation and contracts
├── tests/            # Unit and integration tests
└── README.md         # This file
```
