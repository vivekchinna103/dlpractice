const sql = require('mssql');
require("dotenv").config();
const runIndexer=require('./cognitiveSearch/runIndexer')

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433, 
    database:process.env.DB_NAME,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true

    }
}

console.log("Starting...");



  async function getFile(id) {
    try { 
        const poolConnection =await  sql.connect(config);

        const resultSet = await poolConnection.request().query(`select FileName from [dbo].[case_studies] where id=${id}`);
        return(resultSet.recordset[0].FileName)
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }

 //changes     
  }
  async function addData(name,account,vertical,solution,sof,status,dep,remarks,meta,file,rating) {
    try { 
        const poolConnection =await  sql.connect(config);

        await poolConnection.request().query(`insert into [dbo].[case_studies](CaseStudyName,Account,Vertical
            ,SolutionName,ServiceOfferingMapping,Status,Dependency,Remarks,MetaData,FileName,Rating) values('${name}','${account}','${vertical}','${solution}','${sof}','${status}','${dep}','${remarks}','${meta}','${file}','${rating}')`);
        console.log("added")
        runIndexer.run();
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }
  }

  async function updateData(id,name,account,vertical,solution,sof,status,dep,remarks,meta,file,rating) {
    try { 
        const poolConnection =await  sql.connect(config);

        await poolConnection.request().query(`update [dbo].[case_studies] set CaseStudyName='${name}',Account='${account}',Vertical='${vertical}',SolutionName='${solution}',
        ServiceOfferingMapping='${sof}',Status='${status}',Dependency='${dep}',Remarks='${remarks}',
        MetaData='${meta}',FileName='${file}',Rating='${rating}' where id = ${id}`);
        console.log("updated")
        runIndexer.run();
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }
  }
  async function getRow(id) {
    try { 
        const poolConnection =await  sql.connect(config);

        const result=await poolConnection.request().query(`select * from [dbo].[case_studies] where id=${id} `);
        console.log(result.recordset[0])
        return(result.recordset[0])
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }
  }
  async function getAll() {
    try { 
        const poolConnection =await  sql.connect(config);

        const result=await poolConnection.request().query(`select * from [dbo].[case_studies]`);
        //console.log(result.recordset)
        return(result.recordset)
        poolConnection.close();
        }
    catch (err) {
          console.error(err.message);
      }
  }
  exports.getFile=getFile;
  exports.addData=addData;
  exports.updateData=updateData;
  exports.getRow=getRow;
  exports.getAll=getAll;