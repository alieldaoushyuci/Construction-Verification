# Contractor Certificate Scanner App

A mobile application for verifying and managing contractor certifications. Scan or upload certification documents and validate expiration dates to ensure compliance.

## Features

The app tracks expiration dates for:

- **Contractor Information**: Name, DBA (Doing Business As), Corporation/LLC
- **Licenses**: Contractor License, Bond
- **Insurance**: Workers Compensation, General Liability, Umbrella Coverage, Auto Insurance
- **Certifications**: Forklift, Scissor Lift, OSHA, and custom certifications

## Getting Started

### Prerequisites

- Node.js installed
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. Navigate to the app directory:

   ```bash
   cd my-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

After starting the server, you'll see a QR code in your terminal. Choose one of these options:

**Option 1: Expo Go (Recommended)**

- **iOS**: Open Camera app → Scan QR code → Tap notification → Opens in Expo Go
- **Android**: Open Expo Go → Tap "Scan QR code" → Scan QR code

**Option 2: Simulators/Emulators**

- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Press `w` for web browser

**Note**: Ensure your phone and computer are on the same Wi-Fi network for direct connection.

### Troubleshooting

**Connection Issues:**

- Verify phone and computer are on the same Wi-Fi network
- Check firewall settings
- Try Tunnel mode: Press `s` in terminal → Select "Tunnel"

**App Not Loading:**

- Update Expo Go to the latest version
- Clear Expo Go app cache
- Restart development server (`Ctrl+C` then `npm start`)

## Project Structure

```
my-app/
├── components/          # UI components and screens
├── services/            # External services and API clients
│   └── supabase.js     # Supabase database client
├── assets/              # Static assets (images, icons, etc.)
├── App.js              # Root component
├── index.js            # Entry point
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase
- **Development**: Expo Go for mobile testing
