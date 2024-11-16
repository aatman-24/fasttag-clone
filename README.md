# FastTag-Clone


### Overview
FastTag Clone is a system designed to simplify the process of vehicle management, toll payments, and card recharges. Users can register on the portal, manage their vehicles, order FastTag cards, and perform various operations, including viewing transaction history and recharging their cards. Admins have the ability to manage toll stations and configure toll prices based on vehicle types.

---

### Features

#### For Users:

- Signup & Login: Users can sign up and log in to the portal.
- Order FastTag Cards: Users can order a FastTag card.
- Vehicle Management: Users can attach and remove a vehicle to/from the FastTag card.
- Card Recharge: Users can recharge their FastTag cards.
- View Card Details: Users can view card details.
- Transaction History: Users can check the transaction history of their FastTag cards.
- Vehicle Registration: Users can register and remove vehicles on the portal.

#### For Admins:

- TollStation Management: Admins can set up TollStations at specific locations.
- TollPrice Configuration: Admins can set toll prices for vehicles at each TollStation.
- View TollStations List: Admins can view a list of all TollStations.

#### Toll System:

- When a vehicle passes a TollStation, the toll price is automatically calculated based on the vehicle type and deducted from the FastTag card.

---

### System Architecture

The FastTag Clone system follows a modular architecture with the following components:

1. Frontend Server: The user interacts with the UI to perform all activities like signing up, managing vehicles, and viewing details. The frontend communicates with the backend server.

2. Backend Server: The backend handles all business logic, user management, card operations, and transaction management. It communicates with the frontend to perform CRUD operations and calculates toll deductions when vehicles pass through toll stations.

3. Node-RED Server with Arduino: The Arduino, integrated with a Node-RED server, detects when a vehicle passes a toll station by reading the FastTag card. Upon detection, Node-RED sends a request to the backend server to deduct the toll price from the FastTag card.

4. Toll Stations: Admins can configure toll prices at each location, and the system automatically calculates the toll based on vehicle type.

---

### How it Works

1. User Interaction: The user interacts with the frontend to perform tasks like signing up, ordering cards, and managing vehicle details.
2. Backend Communication: The frontend communicates with the backend server, which handles all the data and operations like card ordering, recharging, and transaction logging.
3. Vehicle Passes Toll Station: When a vehicle passes a toll station, the Arduino with Node-RED detects the card and sends a request to the backend to deduct the toll price.
4. Toll Deduction: The backend server calculates the toll price based on the vehicle type and deducts the amount from the FastTag card balance.

---


### Tech Stack

- Frontend: React.js 
- Backend: Java, Spring Boot, Docker
- Node-RED: For handling communication with Arduino
- Arduino: For detecting FastTag cards at the toll station
- Database: MYSQL, Hibernate

