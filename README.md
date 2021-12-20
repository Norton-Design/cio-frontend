# Customer.io Frontend Portion
Completed by Michael Norton

# Things I will add:

1. paginated responses
2. favicon and metadata changes

# Thoughts and musings:
1. The customer edit page has "created_at" listed as a permanent (albeit, mutable) attribute, as does the backend prompt BUT this isn't found in the sample api call. This presents a problem as I wanted to have all the attributes that couldn't be deleted at the top of the list. Hmm, I'll see if I can adjust the sample api given.... 

Completed this, BUT Go was requiring everthing in attributes to be a string SO I might have to change this back (from str to num) once I've completed everything. This might make testing a pain...

# What would I do next

1. Login/Logout functionality 
The mock-ups imply login/logout functionality although it appears to fall outside of the scope of the instructions. Besides allowing users to have a completely customized user experience, this is also a prerequisite for authorization. Speaking of which.... 

2. Authorization
This is an absolute-must for all applications to prevents unauthorized users from enacting any CRUD functionality on any feature that they shouldn't be able to. For this particular project, the use React Router protected routes in collaboration with a backend auth system.

3. Global State
As the application scales, we'll become limited through the creation of consumption of React Contexts so the use of a stronger global state management solution would be necessary. Through the use of reducers and actions, we can guarantee that the store only retains data that is relevant to us throughout the entire applcation, in a normalized format.

4. Global Error Handling
Establishing global state allows us to allow set up a global error handling component that can be fed errors through the store. This is a fantastic option because it drys up our code immensely, and prevents the end to create error handling solutions for each component.







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
