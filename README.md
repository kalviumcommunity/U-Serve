# **U-Serve**

An innovative platform tailored for college campuses to enhance community engagement, facilitate volunteering opportunities, and promote social impact initiatives. This platform addresses challenges like limited visibility of opportunities, fragmented communication, and lack of coordination among volunteers and organizers.

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributing](#contributing)

## **Features**

### 1. **Volunteer Opportunity Marketplace**
   - Centralized hub for posting and discovering volunteer opportunities.
   - Customizable search filters based on interests, skills, availability, and causes (e.g., education, healthcare).

### 2. **Community Events Calendar**
   - Calendar to view and manage events like service projects, workshops, and fundraisers.
   - Event registration, attendance tracking, and feedback collection.

### 3. **Volunteer Recognition**
   - Virtual badges, certificates, and volunteer hour tracking.
   - Achievements and impact can be showcased on user profiles.

### 4. **Communication Tools**
   - Messaging and notifications for volunteers and organizers.
   - Discussion forums, group chats, and project collaboration spaces.

### 5. **Impact Tracking and Reporting**
   - Dashboard for tracking hours served, projects completed, and overall community impact.
   - Analytics for generating insights and showcasing achievements.

## **Tech Stack**
- **Frontend:** Next.js, React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT and Google One Tap
- **Deployment:** Vercel
- **Styling:** ShadcnUI

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/kalviumcommunity/U-Serve.git
   ```

2. Navigate to the project directory:
   ```bash
   cd U-Serve
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables by creating a `.env.local` file in the root directory and adding the following:
   ```bash
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser.

## **Contributing**

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
