# SPEC-001: Accessible Learning Platform for the Visually Impaired

## Background
The traditional educational content relies heavily on visual elements, which are challenging for visually impaired individuals. This platform aims to provide essential accessibility features to make educational content more inclusive using CV and RAG technologies.

## Requirements

### Must-Haves
1. **Basic Image Analysis:**
   - Use CV to analyze images and convert them to descriptive text.
2. **Basic Text Generation:**
   - Use RAG to generate descriptions for analyzed images.
3. **Voice Integration:**
   - Provide text-to-speech functionality for generated descriptions.
4. **Simple User Interface:**
   - Ensure basic accessibility features like screen reader support.

### Should-Haves
1. **Basic Content Management:**
   - Allow users to upload images.
2. **User Profiles:**
   - Enable basic user registration and login.

### Won't-Haves
1. **Video Analysis:**
   - Focus only on image analysis for the MVP.
2. **Interactive Q&A Support:**
   - This will be postponed for future development.

## Method
We'll use Vercel's Next.js for the front end, our own LLMs for text and voice, and a simplified CV model for image analysis. Additionally, we will integrate AI and OpenAI libraries, Husky for pre-commit styling, and utilize the following resources:
- [oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui) for text generation and RAG.
- [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) for image analysis.
- OpenAI API for text-to-voice functionality.

## Project Progress

### Features Implemented

#### User Authentication
- **Sign In:** Users can sign in using their email and password.
- **Sign Out:** Authenticated users can sign out from the application.
- **Session Handling:** User session is maintained using next-auth, and appropriate UI elements are shown based on the authentication status.

#### User Registration
- **Registration Form:** A registration form where users can enter their full name, email, and password to create a new account.
- **Form Validation:** Ensures that all required fields are filled out correctly.
- **Database Storage:** New user data is saved in the bootcamp24q2 MongoDB database.

#### Profile Management
- **Profile Page:** Authenticated users can view and update their profile information.
- **Profile Update:** Users can change their name, email, and password. The changes are saved to the database.
- **Form Feedback:** Displays success or error messages based on the outcome of the update operation.

#### Contact Page
- **Contact Form:** Users can send messages by filling out their name, email, and message.
- **Message Storage:** Messages are saved to a MongoDB collection for further review.

#### Personal Page
- **Personalized Welcome:** Displays a personalized welcome message with the user's full name.
- **Navigation Links:** Provides links to the user's GitHub and LinkedIn profiles.
- **Back Navigation:** Includes a button to navigate back to the personal page from the profile page.

### UI and Navigation
#### Header
- Displays the platform name and tagline.
- Shows user's full name next to the sign-out button when authenticated.
- Navigation links to Home, About, and Contact pages.

#### Footer
- Includes the company logo, name, and navigation links to Home, About, and Contact pages.
- Company information and branding.

### Responsive Design
- **Tailwind CSS:** Utilized for styling to ensure a responsive and visually appealing layout across different devices.

### API Integration
- **User Registration API:** Handles user registration and saves data to MongoDB.
- **User Update API:** Allows users to update their profile information and saves changes to MongoDB.

## Technical Specifications
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Authentication:** next-auth
- **Database:** MongoDB (Database: bootcamp24q2)
- **Languages:** TypeScript for type-safe code

## Team


## Support
If you have any questions or need assistance, please contact our support team at [support@accessiblelearningplatform.com](mailto:support@accessiblelearningplatform.com).

## Feedback
Your feedback is valuable to us. Please share your experience and suggestions to help us improve the platform.

## License
This project is licensed under the MIT License.
