#  🏆 React Native Advance Architecture 🏆 

[![React Native](https://img.shields.io/badge/React%20Native-v0.62.2-green.svg)](https://facebook.github.io/react-native/)
[![React Navigation V5](https://img.shields.io/badge/React%20Navigation-v5.1-blue.svg)](https://reactnavigation.org/)

This project aims to act as a template for React Native. This project configured with redux, redux saga and redux persist. 
Uses the latest version of react-navigation (v5)

## Libraries

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Navigation](https://reactnavigation.org/) with [Authentication flow](https://reactnavigation.org/docs/auth-flow) baked in.
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [Redux](http://redux.js.org/) with [hooks](https://react-redux.js.org/api/hooks) support
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist/)
- [Reselect](https://github.com/reduxjs/reselect)
- [Jest](https://facebook.github.io/jest/)
- [Eslint](http://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))

## Prerequisites

- [Node](https://nodejs.org) v10 (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/)
- A development machine set up for React Native by following [these instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Project Structure

- `/app` - Contains React Native App codebase
  - `/api` - Api module class. Each file will be feature based like ProductAPI, LoginAPI etc...
  - `/components` - Universal shared containers, components are stand-alone and decoupled.
  - `/config` - Universal styles,images,metrics etc...
  - `/screens` - Feature level containers that holds the entire screen or page 
    - `login`- Login Feature
      - `reducers` - Reducer associated with this feature
      - `sagas` - Sagas related with this particular feature
      - `selectors` - Selectors associated with the feature
      - `widgets` - Containers associated with the feature that has theme or project scheme 
  - `/lib` - lib helper files
  - `/navigation` - All navigation related stuff including helpers functions and navigation stack
    - `NavigationService.js` - Service class for navigation - can be used without using props
    - `NavigationStack.js` - Stack to define navigation. you can split things further if needed.
  - `/store` - Includes everything you need to set up store.
    - `reducers` - Combines all feature based reducers
    - `sagas` - Combines all feature based sagas
    - `index.js` - Set ups store and export things

## Getting Started

1. Clone this repo, `git clone https://github.com/Toolbone/RNAdvanceArcht.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Use [React Native Rename](https://github.com/junedomingo/react-native-rename) to update project name `$ npx react-native-rename <newName>`
5. Run `yarn` or `npm install` to install dependencies

6) Start the packager with `npm start`
7) Connect a mobile device to your development machine
8) Run the test application:

- On Android:
  - Run `react-native run-android`
- On iOS:
  - Open `ios/YourReactProject.xcworkspace` in Xcode
  - Hit `Run` after selecting the desired device

9. All set!!!, you are ready to go!
