const indexer=require('./cognitiveSearch/createIndexer')
const index=require('./cognitiveSearch/createIndex')
const dataSource=require('./cognitiveSearch/createDataSource')
const dataFilter=require('./cognitiveSearch/oDataFilter')
const geturl = require('./blobClient')
const express=require('express');
const { stringify } = require('querystring');
const app = express();
const cors=require("cors")
const getFile=require('./connectDb')
const upload=require('./blobClient')
var multer=require("multer");
var Up=multer({dest:"uploads/"});

app.use(express.json());
app.use(cors())
require("dotenv").config();



//dataSource.makeDataSource();
//index.makeIndex();
//indexer.makeIndexer();
//dataFilter.oDataFilter(account,null,null,null);

app.get('/',(req,resp)=>{
  resp.send("hello")
})

app.post("/filter",async(req,resp)=>{
  const bodyContent = req.body;
  var account=bodyContent.Account;
  if(account){
    account.stringify;
  }
  else{
    account=null;
  }
  var vertical=bodyContent.Vertical;
  if(vertical){
    vertical.stringify;
  }
  else{
    vertical=null;
  }
  var serviceOfferingMapping=bodyContent.ServiceOfferingMapping;
  if(serviceOfferingMapping){
    serviceOfferingMapping.stringify;
  }
  else{
    serviceOfferingMapping=null;
  }
  var metaData=bodyContent.MetaData;
  if(metaData){
    metaData.stringify;
  }
  else{
    metaData=null;
  }
  var rating=bodyContent.Rating;
  if(rating){
    rating.stringify;
  }
  else{
    rating=null;
  }
  
  (async () => {
    const val=(await dataFilter.oDataFilter(account,vertical,serviceOfferingMapping,metaData,rating))
    resp.send(val);
  })()
})
//changes
app.post("/add",Up.single("File"),(req,resp)=>{
  const bodyContent=req.body;
  var name=bodyContent.CaseStudyName
  var account=bodyContent.Account
  var vertical=bodyContent.Vertical
  var solution=bodyContent.SolutionName
  var sof=bodyContent.ServiceOfferingMapping
  var status=bodyContent.Status
  var dep=bodyContent.Dependency
  var remarks=bodyContent.Remarks
  var meta=bodyContent.MetaData
  var FileName=bodyContent.FileName 
  var rating=bodyContent.Rating
  if(req.file!=null){
    var file_name=req.file.originalname
    var file_path=req.file.path
  }
  getFile.addData(name,account,vertical,solution,sof,status,dep,remarks,meta,FileName,rating)
  if(file_name!=null){
    upload.Upload(file_name,file_path)
  }else{
    resp.send("No File")
  }
  resp.send("added");

})

app.put("/update/:id",Up.single("File"),(req,resp)=>{
  const bodyContent=req.body;
  var id=bodyContent.id;
  id=parseInt(id)
  var name=bodyContent.CaseStudyName
  var account=bodyContent.Account
  var vertical=bodyContent.Vertical
  var solution=bodyContent.SolutionName
  var sof=bodyContent.ServiceOfferingMapping
  var status=bodyContent.Status
  var dep=bodyContent.Dependency
  var remarks=bodyContent.Remarks
  var meta=bodyContent.MetaData
  var FileName=bodyContent.FileName
  var rating=bodyContent.Rating
  if(req.file != null){
    var file_name=req.file.originalname
    var file_path=req.file.path
  }
  getFile.updateData(id,name,account,vertical,solution,sof,status,dep,remarks,meta,FileName,rating)
  if(file_name!=null){
    upload.Upload(file_name,file_path)
  }else{
    resp.send("No File")
  }
  resp.send("update");
})

app.get('/case/:id',(req,resp)=>{
  (async () => {
    var result=(await getFile.getRow(req.params.id))
    resp.send(result)
  })()
})


app.get('/allCases',(req,resp)=>{
  (async () => {
    var result=(await getFile.getAll())
    resp.send(result)
  })()
})

app.get("/image/:id",(req,resp)=>{
    (async () => {
      var file=(await getFile.getFile(req.params.id))
      console.log(file)
      file=file+'.pptx';
      var url = geturl.getURL(file)
      resp.json({
        file:`${url}`
      })
    })()
    
  
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

console.log("helo")