# ProcureFlow – Enterprise Vendor Management System

## Overview

ProcureFlow is a full-stack enterprise vendor management platform that digitizes the complete procurement lifecycle for organizations. The system enables vendor onboarding, admin approval workflows, quotation submission and comparison, intelligent vendor selection, purchase request approval, automated email notifications, invoice generation, and reporting dashboards.

This project was developed as an industry-oriented procurement management solution to reduce manual operations, improve vendor decision-making, and streamline enterprise procurement processes.

## Problem Statement

Organizations often manage vendors and procurement requests manually using spreadsheets, emails, and paper-based approval workflows. This leads to:

* Delayed vendor approvals
* Difficult quotation comparisons
* Manual vendor selection
* Lack of centralized procurement records
* Inefficient communication with vendors
* Limited reporting and analytics

## Solution

ProcureFlow provides a centralized procurement platform where vendors can register, submit quotations, and receive automated notifications, while administrators can manage vendors, compare quotations, approve purchase requests, generate invoices, and monitor procurement activities through dashboards and reports.

## Key Features

### Vendor Module

* Vendor registration and login
* Quotation submission
* Purchase request tracking
* Email notification on approval
* Vendor dashboard

### Admin Module

* Vendor approval and management
* Quotation comparison from multiple vendors
* Intelligent best-vendor suggestion
* Purchase request approval
* Invoice generation
* Procurement reports and analytics dashboard

### Automation

* Email notifications using Nodemailer
* Workflow-based approval system
* Centralized procurement records

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Other Tools

* Nodemailer
* Git & GitHub
* REST APIs

## System Workflow

1. Vendor registers on the platform
2. Admin reviews and approves the vendor
3. Vendor logs in and submits quotations
4. Admin compares quotations from multiple vendors
5. System suggests the most suitable vendor
6. Admin selects and approves the vendor
7. Automated approval email is sent to the vendor
8. Invoice is generated
9. Reports and procurement analytics are available in the dashboard

## Project Architecture

Client (React + Vite + Tailwind)
|
v
Express.js REST API
|
v
MongoDB Database
|
v
Nodemailer Email Service

## Installation

### Clone the repository

git clone https://github.com/prathamesh01-dev/procureflow-enterprise-vendor-management-system.git

### Frontend

cd procureflow-frontend
npm install
npm run dev

### Backend

cd ../server
npm install
npm start

## Future Enhancements

* AI-based vendor risk scoring
* Predictive procurement analytics
* Multi-level approval workflows
* Role-based access control enhancements
* Cloud deployment and scalability improvements

## Author

Prathamesh Kale

Java Full Stack Developer | IT Graduate (2025)

GitHub: https://github.com/prathamesh01-dev

## License

This project is developed for educational and project demonstration purposes.
