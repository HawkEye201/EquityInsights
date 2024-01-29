# EquityInsights
EquityInsights is a Node.js project offering real-time stock data retrieval, storage in MongoDB, and RESTful API endpoints for stock analysis and management, with in-memory caching for optimized performance.

### Features
- Real-time stock data retrieval from the BSE website
- Storage of stock data in MongoDB
- Creation of a RESTful API using Express.js
- Support for top 10 stocks retrieval, search by name, price history, favorites management (add, view, remove)
- Refresh functionality to update data.
- In-memory caching of stock data for optimized performance
## Local Environment Setup:
For running this project locally, you need to set up and define the environment variables.
- Create .env in the root directory with the following variables and add the connection string from MongoDB:
    - MONGO_URI=

## Local Setup:
- Clone the repo
- cd EquityInsights/
- npm install
- npm start

## API Endpoints
- "localhost:3000/top10stocks" - GET
  
  ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/0bfba621-3d54-4558-ad7d-7216cb9eb137)

- "localhost:3000/stocksByName" - GET

  Sample Request Body:
  
    {
      "name": "ABB"
    }

    ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/f388c9f1-3892-4ca1-9a12-370fe57a32e3)


- "localhost:3000/stockPriceHistory" - GET

  Sample Request Body:
  
    {
      "code": "500003"
    }
  
  ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/c20edb55-731d-4ba4-83b6-90d6a05aef75)

- "localhost:3000/addfavourites" - POST

  Sample Request Body:
  
    {
      "code": "500003"
    }
  
  ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/d24cc836-bc4f-42d2-be15-3ca8a6f828c3)
  
- "localhost:3000/getfavourites" - GET
  
  ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/28efa991-9b08-4c4a-8bd7-4de4d1dd2eee)

- "localhost:3000/deletefavourites" - POST
  
  Sample Request Body:
  
    {
      "code": "500003"
    }

  ![image](https://github.com/HawkEye201/EquityInsights/assets/64590605/e4c63642-6f70-45a8-b7a0-e4d5b885a414)

