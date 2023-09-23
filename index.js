
     
document.addEventListener("DOMContentLoaded", function () {
    let studentData = []; // Initialize an empty array to store student data

    // Fetch the student data from the provided URL
    fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(response => response.json())
        .then(data => {
            studentData = data; // Store the student data in the array
            addRowInTable(studentData); // Display all students by default
        })
        .catch(error => console.error('Error fetching data:', error));

//on page refresh the original data populate
// window.onload = addRowInTable(studentdata),getData();
let sort_Z_A=(prop)=>{
    removeTbodyChild();
    let sortdata = studentData.sort(GetSortOrderZ_A(prop));
    addRowInTable(sortdata);
}

let sortByRequired = (props) =>{
    removeTbodyChild();
    let sortdata = studentData.sort(GetSortOrder(props));
    addRowInTable(sortdata);
}



document.getElementById('sort_A_Z').addEventListener('click', () => sortByRequired("first_name"));
document.getElementById('sort_Z_A').addEventListener('click', () =>sort_Z_A("first_name"));
document.getElementById('sort_marks').addEventListener('click',()=> sortByRequired("marks"));
document.getElementById('sort_passing').addEventListener('click',()=> sortByRequired("passing"));
document.getElementById('sort_class').addEventListener('click',() =>sortByRequired("class"));
document.getElementById('sort_gender').addEventListener('click', ()=> sortByRequired("gender"));


//  let searchResult=()=>{
//     var inputData = document.getElementById("search").value;
//     let searchData=[];
//     if(inputData!= "" ){  
//         let filter = inputData.toUpperCase().trim();
        
//         searchData  = studentdata.filter((ele)=>{
//            return filter==ele.first_name.toUpperCase() || filter==ele.id || filter==ele.last_name.toUpperCase() || filter==ele.marks || filter==ele.class || filter==ele.email.toUpperCase() || filter==ele.first_name.toUpperCase()+" "+ele.last_name.toUpperCase() || filter==ele.gender.toUpperCase();
//          })
//         if(searchData && searchData.length>0){
//             removeTbodyChild();
//             addRowInTable(searchData);
//         }
//          else{
//             alert("Data not found. Please enter the valid text !!")
//          }
//      }else{
//         alert("Please enter the valid text!!")
//      }
    
//  }

  // Search functionality
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredStudents = studentData.filter(student =>
          student.first_name.toLowerCase().includes(searchTerm) ||
          student.last_name.toLowerCase().includes(searchTerm) ||
          student.email.toLowerCase().includes(searchTerm) ||
          student.gender.toLowerCase().includes(searchTerm) ||
          student.class==searchTerm ||
          student.id==searchTerm ||
          student.marks == searchTerm

      );
      if(filteredStudents.length!=0){
        removeTbodyChild();
        addRowInTable(filteredStudents);
      }
      
  });


//sort compare function
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
 

//sort Z->A compare function
function GetSortOrderZ_A(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

//adding row in tbody
function addRowInTable(studentData){
     const tbody = document.getElementById("myTable");
     for (let i = 0; i < studentData.length; i++) {
            let e = studentData[i];
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${e.id}</td>
                           <td>${e.first_name} ${e.last_name}</td>
                           <td>${e.gender}</td>
                           <td>${e.class}</td>
                           <td>${e.marks}</td>
                           <td>${e.passing}</td>
                           <td>${e.email}</td>  `;
                 tbody.appendChild(tr);
              }
    }

function removeTbodyChild(){
    const list =  document.getElementsByTagName('tbody')[0];
      while (list.hasChildNodes()) {
         list.removeChild(list.firstChild);
      }
}


})