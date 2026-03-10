# Agentic AI Pharmacy System

An AI-powered pharmacy assistant that understands prescriptions, helps users find medicines, and automates the pharmacy workflow using intelligent agents.

## Overview

Traditional pharmacy systems require users to manually search for medicines.
This project introduces an Agentic AI System that acts like an intelligent
pharmacist assistant.

The system can:
- Understand prescription images
- Recommend medicines
- Guide users through a friendly chatbot
- Help admins manage pharmacy inventory

 ## Features

- 📷 Prescription Image Understanding (OCR + AI)
- 💬 Friendly AI Chatbot
- 💊 Medicine Recommendation
- 🛒 Medicine Ordering System
- 📦 Inventory Management (Admin)
- 📊 Admin Dashboard
- 👤 User Dashboard

  ## System Architecture

User → Upload Prescription → AI Agent
AI Agent → Extract Medicines → Check Inventory
AI Agent → Recommend Medicines → Chatbot Guidance
Admin → Manage Medicines → Update Inventory

## Tech Stack

Frontend:
- React / Next.js

Backend:
- Node.js / Python (FastAPI)

AI:
- OpenAI / Gemini
- OCR for prescription understanding

Database:
- MongoDB / PostgreSQL

Tools:
- VS Code
- GitHub

  ## Usage

1. Upload a prescription image
2. AI extracts medicines from the image
3. Chatbot helps you understand medicines
4. Add medicines to cart
5. Place an order
