## Overview

This project consists of a React frontend and a Node.js backend.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Requirements

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (>=22.0.0)
- npm (>=10.8.0)

## Installation

### Clone the Repository

```bash
git clone https://github.com/marahmedi/getOrganised.git
cd getOrganised

cd server
npm install

cd ../frontend
npm install

cd backend
npm start

cd frontend
npm start
```

The frontend will be available at http://localhost:3000 and the backend API at http://localhost:4000

Create a .env file in the backend directory with the following content:
PORT=4000
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

Replace the placeholder values with your actual PostgreSQL database credentials.
