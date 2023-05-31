require("dotenv").config();
const endpoint = process.env.SEARCH_API_ENDPOINT;
const apiKey = process.env.SEARCH_API_KEY;
const { SearchIndexerClient, AzureKeyCredential,SearchIndexClient } = require("@azure/search-documents");

function makeIndex() {
    console.log(`Running Create Index Sample....`);
    if (!endpoint || !apiKey) {
      console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
      return;
    }
    const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
    const index = {
      name: "dlcasestudy",
      fields: [
        {
          type: "Edm.String",
          name: "id",
          key: true,
          filterable:true,
          searchable:true,
          sortable: true
        },
        {
          type: "Edm.String",
          name: "CaseStudyName",
          searchable:true,
          sortable: true,
          filterable: true,
        },
       /* {
          type: "Edm.String",
          name: "Account",
          searchable:true,
          sortable: true,
          filterable: true,
          facetable:true,
        }, */
        {
          type: "Edm.String",
          name: "Vertical",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "SolutionName",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "ServiceOfferingMapping",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "Status",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "Dependency",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "Remarks",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "MetaData",
          searchable:true,
          sortable:true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "FileName",
          searchable:true,
          sortable: true,
          filterable: true,
        },
        {
          type: "Edm.String",
          name: "Rating",
          searchable:true,
          sortable: true,
          filterable: true,
        },
  
      ]
    };
    client.createIndex(index);
  }
  

exports.makeIndex=makeIndex;