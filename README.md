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
- *Other custom certifications as needed*

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
   ```bash
   npm start
    ```
The backend will run at: http://localhost:5001

## Starting the Frontend
1. Navigate to the frontend folder
   ```bash
   cd frontend
   ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the development server
    ```bash
   npm run dev
   ```
The frontend will run at: http://localhost:5173



## Repository Structure (Tentative)
- /contractor-cert-scanner
- ├── frontend/ # Mobile or web front-end
- ├── backend/ # API and data validation
- ├── docs/ # Documentation and contracts
- ├── tests/ # Unit and integration tests
- └── README.md # Project overview
