require("dotenv").config();
const endpoint = process.env.SEARCH_API_ENDPOINT;
const apiKey = process.env.SEARCH_API_KEY;
const { SearchIndexerClient, AzureKeyCredential,SearchIndexClient } = require("@azure/search-documents");

 function makeIndexer() {
    console.log(`Running Create Indexer Sample....`);
    if (!endpoint || !apiKey) {
      console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
      return;
    }
    const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
    const indexer = {
      name: "dlcasestudy",
      dataSourceName: process.env.DATA_SOURCE_NAME,
      targetIndexName: process.env.INDEX_NAME,
      isDisabled: false
    };
  
    client.createIndexer(indexer);
  }
  
 

exports.makeIndexer=makeIndexer

