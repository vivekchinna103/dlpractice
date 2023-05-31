require("dotenv").config();
const endpoint = process.env.SEARCH_API_ENDPOINT;
const apiKey = process.env.SEARCH_API_KEY;
const { SearchIndexerClient, AzureKeyCredential,SearchIndexClient } = require("@azure/search-documents");
  
  
 function makeDataSource() {
    console.log(`Running Create Datasource Connection Sample....`);
  
    if (!endpoint || !apiKey) {
      console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
      return;
    }
    
    const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
    const dataSourceConnection = {
      name: "dlsqldata",
      type: "azuresql",
      connectionString : process.env.DB_CONN_STR,
      container: { 
          name : process.env.TABLE_NAME ,
          query: null,
        }
    };
  
    client.createDataSourceConnection(dataSourceConnection);
  };
 

  
  

exports.makeDataSource=makeDataSource;

