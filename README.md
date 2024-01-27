# EquityInsights
## Local Environment Setup:
For running this project locally, you need to set up and define the environment variables.
- Create .env in the root directory with the following variables:
    - MONGO_URI=

## Local Setup:
- Clone the repo
- cd EquityInsights/
- npm install
- npm start

## API Endpoints
- "localhost:3000/top10stocks" - GET
- "localhost:3000/stocksByName" - GET
- "localhost:3000/stockPriceHistory" - GET
- "localhost:3000/addfavourites" - POST
  
  Sample Request Body:
    {
      "code": "500003"
    }
  
- "localhost:3000/getfavourites" - GET
- "localhost:3000/deletefavourites" - POST
  
  Sample Request Body:
    {
      "code": "500003"
    }
