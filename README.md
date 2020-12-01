#  🏆 React Native - WooCommerce - Advanced Architecture

[![React Native](https://img.shields.io/badge/React%20Native-v0.63.2-green.svg)](https://facebook.github.io/react-native/)
[![React Navigation V5](https://img.shields.io/badge/React%20Navigation-v5.7.3-blue.svg)](https://reactnavigation.org/)

This project aims to act as a template for React Native. This project configured with redux, redux saga and redux persist. 
Uses the latest version of react-navigation (v5).

This project also serves as a template for Wordpress + Woocommerce mobile app, which makes it more real-world project template!

## Recently Build
 * [x] iOS
 * [x] Android
 
## Libraries

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Navigation](https://reactnavigation.org/) with [Authentication flow](https://reactnavigation.org/docs/auth-flow) baked in.
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [Redux](http://redux.js.org/) with [hooks](https://react-redux.js.org/api/hooks) support
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist/)
- [Axios](https://github.com/axios/axios)
- [JSON Server](https://github.com/typicode/json-server)
- [Reselect](https://github.com/reduxjs/reselect)
- [Jest](https://facebook.github.io/jest/)
- [Eslint](http://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))

## Prerequisites

- [Node](https://nodejs.org) v10 (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/)
- A development machine set up for React Native by following [these instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Project Workflow
![Work Flow](/app/assets/Project_Flow.png)


## Project Structure

- `/app` - Contains React Native App codebase
  - `/api` - Api module class. Each file will be feature based like ProductAPI, LoginAPI etc...
  - `/components` - Universal shared containers, components are stand-alone and decoupled.
  - `/containers` - Project level containers, like widget associated with project scheme but in a higher level
  - `/config` - Project level styles, images, metrics, strings etc...
  - `/controllers` - This includes centralise error handling mechanism and other Project controllers
  - `/systems` - Project redux elements (actions and reducers), constants, types
  - `/screens` - Feature level containers that holds the entire screen or page 
    - `Login`- Login Feature
        - `redux`- Redux state managing files
          - `reducers` - Reducer associated with this feature [might be 0..* or 0..0]
          - `sagas` - Sagas related with this particular feature [might be 0..* or 1..*]
          - `selectors` - Selectors associated with the feature
      - `widgets` - Containers associated with the feature that has theme or project scheme 
  - `/lib` - lib helper files
  - `/navigation` - All navigation related stuff including helpers functions and navigation stack
    - `NavigationService.js` - Service class for navigation - can be used without using props
    - `App.js` - Stack to define navigation. you can split things further if needed.
  - `/store` - Includes everything you need to set up store.
    - `reducers` - Combines all feature based reducers
    - `sagas` - Combines all feature based sagas

## Getting Started

1. Clone this repo, `git clone https://github.com/Toolbone/RNAdvanceArcht.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Use [React Native Rename](https://github.com/junedomingo/react-native-rename) to update project name `$ npx react-native-rename <newName>`
5. Run `yarn` or `npm install` to install dependencies

6. Start the packager with `npm start`
7. Connect a mobile device to your development machine
8. Run the test application:

- On Android:
  - Run `react-native run-android`
- On iOS:
  - Open `ios/YourReactProject.xcworkspace` in Xcode
  - Hit `Run` after selecting the desired device

9. All set!!!, you are ready to go!

#####Shortcut
1. Clone this repo, `git clone https://github.com/Toolbone/RNAdvanceArcht.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. yarn install (remember to have Yarn to do this)
4. yarn mock
5. yarn run:ios:debug OR run:android:debug
6. Then You Should be Set!!!

## Troubleshooting
When you face issue with node_module try this steps into your terminal

1. rm -rf node_modules 
2. npm install

If there is an issue with Base 64 and utf8 try
* npm install buffer
 
Unable to resolve module \<module> from `node_modules/ ****`: \<module> could not be found within the project.

If you are sure the module exists, try these steps:
 1. Clear watchman watches: watchman watch-del-all
 2. Delete node_modules: rm -rf node_modules and run yarn install
 3. Reset Metro's cache: yarn start --reset-cache
 4. Remove the cache: rm -rf /tmp/metro-*
 
 If icons not showing properly(only do once)
 * react-native link react-native-vector-icons

To kill process
1. sudo lsof -i :8081
2. kill -9 <PID>

Extra tool commands for gitif you want to push your local files to remote files 
* git push -f \<remote> \<branch>
* git push -f origin master

## Todo by Priority

 * [X] Use Axios for HTTP client
 * [X] Config a development environments
    * [X] iOS
    * [ ] Android
 * [ ] More Screen Flow
     * [X] Product List
     * [X] Product Detail
     * [ ] Cart and Order List
 * [ ] Use JSON-Server for API mock
 * [ ] Unit Tests   
 * [ ] Clean UI
 
