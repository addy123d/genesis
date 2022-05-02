console.log("Welcome");

var socket = io.connect();
console.log(socket);
//var handle = document.getElementById("handle");

var output1 = document.getElementById("cont");
var number = document.getElementById("studentnumber");

socket.on("students", (data1) => {

    console.log(data1);
    /*  for (var i = 0; i < data1.length; i++) {
          var message = document.createElement("div");
          message.setAttribute("class", "message");
          message.textContent = data1[i].handle + ":" + data1[i].message;
          output1.appendChild(message);
          output1.insertBefore(message, output1.firstChild);
      }*/
    let html = "";
    data1.forEach((element, index) => {
        console.log(data1.length);
        numberlength = `<h2>Registered Students - ${data1.length}</h2>`
        html += `
        <div class="student">
        <div class="name">
        <h2><span class="tito">Name :</span> ${element.name}</h2>
        </div>
        <div class="email">
        <h2><span class="tito">Email :</span> ${element.email}</h2>
        </div>
        <div class="number">
        <h2><span class="tito">Contact Number :</span> ${element.number}</h2>
        </div>
        <div class="branch">
        <h2><span class="tito">Branch :</span> ${element.branch}</h2>
        </div>
        <div class="clgaddr">
        <h2><span class="tito">College Address :</span> ${element.clgaddr}</h2>
        </div>
        <div class="projname">
        <h2><span class="tito"> Project Name :</span> ${element.projname}</h2>
        </div>
        <div class="projguide">
        <h2><span class="tito">Project Guide :</span> ${element.projguide}</h2>
        </div>
        <div class="guidenumber">
        <h2><span class="tito">Guide Number :</span> ${element.guidenumber}</h2>
        </div>
        <div class="projdescription">
        <h2><span class="tito">Project Description :</span> ${element.projdescription}</h2>
        </div>
        <div class="projrequire niche">
        <h2><span class="tito">Requirements :</span> ${element.projrequire}</h2>
        </div>
        <div class="workshpdetail" style="margin-bottom:3%">
        <a href="/${element.email}"><button>View Details</button></a>
        </div>
       
        </div>
        `;
    })


    output1.innerHTML = html;
    number.innerHTML =  numberlength;

})




