

document.body.innerHTML = `
                        <div class="container bg-dark p-5">
                        <div class=" heading-container "><h1>Excel Based Application</h1> </div>
                        <div class="file-table" >
                            
                        </div>
                        <table class="table table-sm  text-white">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col-2">File Name</th>
                            <th scope="col">Open</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody class="table-body">
                            
                        </tbody>
                        </table>
                        </div>
                            `;
var AllFiles;
async function getData() {
  //onClick fuc on Search Input
  //let searchedName = document.querySelector(".srch-value").value;
  await fetch("http://localhost:8080/ExcelHandler/GetAllFiles")
    .then((r) => r.json())
    .then((d) => (AllFiles = JSON.parse(d) ))
    .catch((error) => {
      console.log("Error", error);
    });

    ShowFiles();
}
getData();

var myIP=[];
async function GetIP()
{
  // await fetch("http://api.ipify.org")
  // .then(r => ip=r.json())

  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;  
 	var pc = new RTCPeerConnection({iceServers:[]}), 
 	noop = function(){}; 
     
    	pc.createDataChannel("");  
     	pc.createOffer(pc.setLocalDescription.bind(pc), noop);   
    	pc.onicecandidate = function(ice)
      { 
    	if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
      //console.log( /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.address));
      console.log( ice.candidate);
      myIP.push( /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[0]);
    // myIP=ice.candidate.address;
      console.log("ip",myIP);

      }
    // let req = await fetch("https://peerip.glitch.me/");
    // let data = await req.json();
    // let IP = data.ip;
    // console.log("ip",IP);
      return myIP;
      
}
if(!myIP[0]){GetIP()}

function OpenFile(file){
    
//window.open("ms-excel:ofe|u|C:\\Program Files\\Microsoft Office\\Office16\\EXCEL.EXE");
//window.open("ms-excel:ofe|u|C:\\Users\\Dhananjay P\\Downloads\\ClientData.xlsx");
    // var myfile = new File([],"EWAppWorkbook");

    // // if (!myfile.exists) {
    // //         alert(myfile.name + " could not be found!");
    // // }
    // // else
    // // {
    // //     alert("file exists!");
    // // }


      
    // var blob = new Blob([file],
    //   { type: "text/plain;charset=utf-8" });
    // saveAs(blob, "static.txt");    
   
    // ws= new ActiveXObject("WScript.shell");
    // ws.Run("c:/windows/system32/nodepad.exe",1,false);
  
console.log(file);

  var s= [myIP[0],file];
  console.log("s",s[0])
  fetch('http://localhost:8080/ExcelHandler/StoreKeyFile', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(s)
  }).then(res => res.json())
  .then(res => console.log(res));

}
  

function DeleteFile(fileName)
{
  //console.log("Deleting..",fileName);
  if (confirm(`Press Ok to Delete ${fileName}.`) == true) {
    fetch('http://localhost:8080/ExcelHandler/HandleDeleteFile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fileName)
    }).then(res => res.json())
    .then(res => console.log(res));
  }

 getData();
}

function ShowFiles() {
  let filesContainer = document.querySelector(".table-body");
  filesContainer.innerHTML = "";
    console.log(AllFiles);

    AllFiles.FileName.forEach((file,ind) => {
         filesContainer.innerHTML += `
         <tr>
         <th scope="row">${ind+1}</th>
         <td>${file}</td>
         <td><a href="ms-excel:ofe|u|file:///D:/EW-WEB/EWApp/bin/Debug/EWAppWorkbook.xlsx"  title="Open File"  
         class="btn-open btn" onClick="OpenFile('${file}')"><i class="bi bi-file-earmark-spreadsheet"></i></a></td>
         <td><button title="Delete File"  class="btn-delete " onClick="DeleteFile('${file}')"><i class="bi bi-trash"></i></button></td>
         </tr>
    `;
    });

}

//<button title="Open File"  onClick="OpenFile('${file}')" class="btn-open "><i class="bi bi-file-earmark-spreadsheet"></i></button>
