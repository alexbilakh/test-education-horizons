# Education Horizons Test App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Online Demo

Online demo is available at [https://test-education-horizons.herokuapp.com/](https://test-education-horizons.herokuapp.com/)

## Features & instructions

- Different images with different algorithms
  - Standard: converting number to color algorithm
  - Box Gradient: converting rgb color to xy position algorithm, position guessing from a color
  - Intel Reverse: similar to Box Gradient but simple code
  - BFS(Breadth-First Search): finding similar color for the around positions of current one
- Unit testing for all functions
- CI/CD: auto test, build, deploy

## Development Process

- Analyze requirement
- Find & research to find solutions/algorithms to get colors
- Initiate project, build structure, install packages
- Create components to show the image result
- Write color finding utils
- Writing unit test files for all utils and fix issues found while testing
- Implement CI/CD for faster deployment to online demo
- Regression/smoke test

## Available Scripts

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
