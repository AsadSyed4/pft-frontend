# Product Feedback Tool
The Product Feedback Tool is built using modern web technologies and frameworks, including Vue 3, Vite, and several other libraries. It offers the following features:

## User Registration and Login: 
Users can create an account or log in to access the system.

## Feedback Submission: 
Registered users can submit feedback about the product, including a title, description, and other relevant information.

## Feedback Listing: 
All feedback submitted by users is displayed for others to see.

## Commenting: 
Users can comment on existing feedback, promoting discussions and interactions.

# Project Structure
The project structure is organized as follows:

src/: Contains the source code for the application.
src/components/: Vue components for different parts of the application.
src/views/: Vue views for various pages.
src/router/: Vue Router setup and routing configuration.
src/store/: Application state management using Pinia.
src/api/: API calls and Axios configurations.
src/validation/: Feedback form validation using Vee-Validate.
public/: Static assets.
vite.config.js: Vite configuration file.

## Installation and Setup
Before running the project, make sure you have Node.js and npm installed. To set up the project, follow these steps:

Clone the repository: git clone [https://github.com/AsadSyed4/pft-frontend.git]
Navigate to the project directory: cd Product-Feedback-Tool
Install dependencies: npm install
Running the Development Server
To start the development server, run the following command:

npm run dev

This will launch the application locally, and you can access it in your browser at http://localhost:5173.

Building for Production
To build the application for production, run:

npm run build

This will create a production-ready build in the dist/ directory.

## Testing
The project uses Vitest for unit testing. To run tests, use the following command:

npm run test:unit

## Linting and Code Formatting
To ensure code quality, the project uses ESLint and Prettier. You can lint and format the code using the following commands:

npm run lint       # Lint the code
npm run format     # Format the code

## Dependencies
The project relies on several external dependencies, which are listed in the package.json file. Some of the key dependencies include:

Vue 3: The JavaScript framework used for building the application's user interface.
Vite: The build tool and development server.
Axios: For making HTTP requests to the backend.
Vee-Validate: Used for form validation.
Vue Router: Handles client-side routing.
Pinia: State management for Vue 3.
Yup: Another form validation library.
@vueuse/core: Collection of Vue Composition API utilities.
Other development and testing-related dependencies.
Please ensure that you have these dependencies installed before running the application.

# Conclusion
The Product Feedback Tool is a modern web application that allows users to provide feedback on your product and engage in discussions. You can now explore the codebase, run the development server, and start building upon this foundation to create a valuable feedback platform for your users.
