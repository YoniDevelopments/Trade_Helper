# Trade_Helper

## Stock Alerting and Charting Application

### Overview

This full-stack application provides users with a platform to:

View real-time intraday stock price charts
Set up custom price alerts for specified stocks
Manage their active alerts
Technologies

### Backend

Ballerina: Employing the Ballerina programming language for its network-oriented design, robustness, and developer-friendly constructs.
Alpha Vantage API: Integration with the Alpha Vantage API for retrieving real-time stock market data.
In-Memory Table: Utilizing a Ballerina in-memory table to store and manage user-created alerts.

### Frontend

Next.js: A React-based framework to deliver a dynamic and performant user interface.
Asgardeo: Asgardeo as the Identity Provider (IDP) for secure user authentication and authorization.
Redux: Employing Redux for predictable and centralized application state management.
Lightweight Charts: To render the interactive stock charts.
Architecture


The frontend (Next.js) communicates with the Ballerina backend via RESTful API endpoints.
Frontend user authentication and authorization are handled through Asgardeo.
Stock data is fetched from the Alpha Vantage API and processed by the backend.
Alerts are managed in the backend's in-memory table.

### Key Features

Intraday Stock Charts: Displays Stock price charts using data sourced from the Alpha Vantage API.
Price Alerts: Users can define price-based alerts (above or below thresholds) for specific stocks.
Alert Management: User interface to view, create, and delete active alerts.
Secure Authentication: Robust user authentication and authorization powered by Asgardeo.
Security Considerations

Leverages Asgardeo for secure identity and access management.
Incorporates input validation and sanitization on the backend to mitigate potential vulnerabilities.
Implements role-based authorization (via Asgardeo and Ballerina's interceptor) to enforce proper access controls based on user permissions.
Setup

### Prerequisites

Ballerina installation (https://ballerina.io/)
Node.js and npm or yarn
An Asgardeo account

#### Backend
Obtain an API key for Alpha Vantage (https://www.alphavantage.co/)
Clone the backend repository
Run ```ballerina build```
Run ```ballerina run```

#### Frontend
Clone the frontend repository
Install dependencies (npm install or yarn install)
Configure Asgardeo settings
Run ```npm run dev```

### Future Improvements

Persistent storage: Integrate with a database for long-term alert persistence.
Notifications: Implement email or push notifications for triggered alerts.
Advanced charting: Expanded customization and technical indicators on the stock charts.