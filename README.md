# Project Name

Virtual Interview Assessment

[Hosted on Vercel](https://virtual-iv.vercel.app/)

## Description

This project is a Tinder-like application that allows users to swipe through profiles, match with other users. It uses Next.js for the frontend, Vercel Postgres for the database, and Tailwind CSS for styling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

Instructions for how to install and set up your project:

1. Clone the repository:
   ```bash
   git clone https://github.com/bezeeta222/virtual-iv.git
   ```

2. Change to the project directory:
   ```bash
   cd virtual-iv
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

Instructions for how to use your project. Include examples if possible.

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```bash
   http://localhost:3000
   ```

3. Sign in or sign up to start using the app.

## Features

List of key features of your project. For example:

- User authentication with NextAuth.js
- Swipe functionality to like or dislike profiles
- Matchmaking based on user preferences
- Profile recommendations based on interests and university

## Technologies Used

List the technologies, frameworks, and libraries used in your project. For example:

- Next.js
- Vercel Postgres
- Tailwind CSS
- NextAuth.js
- TypeScript
- Redux
- TypeScript

graph TD
    A[User] --> B[Sign In]
    B --> C[Send Login Request to API]
    C --> D{Login Successful?}
    D -->|Yes| E[Navigate to Main Page]
    D -->|No| F[Navigate to Sign Up Page]
    E --> G[Extract Email from Session]
    G --> H[Send Email to API to Get Recommendations]
    H --> I{Check Logic}
    I -->|Age| J[Filter by Age]
    I -->|Interests| K[Filter by Interests]
    I -->|University| L[Filter by University]
    I -->|Location| M[Filter by Location]
    J --> N[Receive Filtered Recommendations]
    K --> N
    L --> N
    M --> N
    N --> O[Display Recommendations on Main Page]
