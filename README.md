##Summary

This project pulls room booking data from a remote JSON endpoint. It then provides a basic toggling interface to pick a date and show the bookings and their associated room images for that selected date. 

A user can also submit booking data to show a new booking when the application is open. This data does not currently persist between sessions, but could theoretically include local storage persistence, and eventually server-side storage, of such data. This data is currently added to the existing data set that is copied from the remote endpoint by the application. 

The project uses React to separate the main JSON downloading and parsing logic from the form field logic. It also allows all client-side interactive logic and markup to exist in a single location.

In the main Application class, the project uses oboe.js to incrementally grab each JSON object from the provided endpoint. This allows the user to see all of the data that the app has downloaded at a given point even if the entire JSON fails to download. A warning is displayed to the user that not all data is available. This logic can act as a fallback in the event that a large endpoint fails to download, or the user loses their internet connection.

The project only contains rudimentary CSS styling, and is not meant to reflect the visuals of a finalized project.

##Dependencies

This project relies on the Create React App build provided by Facebook (https://create-react-app.dev/docs/getting-started). In order to use it, node and npm should be installed. Additionally, this project relies on oboe.js for downloading JSON from a remote endpoint. oboe.js can also be installed with npm (http://oboejs.com/download).


##Instructions for using Create React App provided by React:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
