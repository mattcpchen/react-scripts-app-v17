### All Packages used
* **react-scripts**
  * `^5.0.1`
* **React17** 
  * `react`
  * `react-dom`
  * `@types/react`
  * `@types/react-dom`
* **React Testing Library for v17** 
  * `@testing-library/jest-dom`
  * `@testing-library/react`
  * `@testing-library/react-hooks`
* **Typescript**
  * typescript cannot be upgraded to `^5.0.2` cause of react-scripts
* **Storybook**
  * add `storybook-css-modules` to allow css-module for storybook 
  * fix `Error: error:0308010C:digital envelope routines::unsupported` issue by adding `NODE_OPTIONS=--openssl-legacy-provider`
  

### Getting Started

* To run this app: `npm run stat`
* To build this app: `npm run build`
* To run storybook for this app: `npm run storybook`
* To run any specific test: 
  * `npm test` for all
  * `npm test src/lmn-comps/autocomplete/hooks/useAutoComplete.test.js`
  * `npm test src/lmn-comps/images-holder/App.spec.js`
* To see app; go to: `http://localhost:3000`