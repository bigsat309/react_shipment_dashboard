# Test assessment for shipment dashboard for Frontend Engineer Position

## Objective

The goal is to design and implement a dashboard that allows an admin to view and manage shipments associated with specific
companies. This feature should enable the admin to select a company from a list, view all shipments associated with it, and navigate to a
detailed view for each shipment. A mock data file in JSON format will be provided to simulate API responses for testing.

## Assessment Requirements

**Shipments List**
  Description: When a company is selected, a list of shipments linked to that company should appear.

  Functionality: Display essential information for each shipment, such as Shipment ID, Status, Reference etc.

**Shipment Details View**
  Description: When a specific shipment is selected, navigate to a detailed view of that shipment.

  Functionality: Show all relevant shipment information, such as geolocation and 2 charts with temperature and humidity. This applies only for shipments with IN PROGRESS status.

  Navigation: Ensure smooth navigation back to the shipments list and between other shipments under the same company.

## Used Libraries

  For Chart Temperature and Humidity Chart components, [recharts](https://recharts.org/)library is used.

  For Map Component for Geolocation, [react-leaflet](https://react-leaflet.js.org/)library is used.

  For better CSS styling and clean code productivity, [Tailwindcss](https://www.npmjs.com/package/tailwindcss)v3.4.15 is used.

  For components basic test, [Jest](https://jestjs.io) and [@testing-library/react](https://testing-library.com/docs/react-testing-library) are used.

  For entire codebase of assessment, [TypeScript](https://www.typescriptlang.org/)v4.9.5 is used.

### `npm install`

  Runs above command will install all necessary packages and libraires to your project and will make node_modules directory and package.lock.json file.
  
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

In src/tests/ directory, there are test files for each components to test their functionality.
You can run "npm test" commands to run the test script.

## Learn More

Entry points of this project is src/index.tsx file.

Index.tsx file renders the src/App.tsx file in it.

App.tsx file is a Shipment Dashboard so you can start edit from src/App.tsx file.

You can clone this project from this [Git Repo](https://github.com/bigsat309/react_shipment_dashboard/)
