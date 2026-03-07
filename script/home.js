
const allIssuesBtn = document.getElementById("all-issues-btn");
const openIssuesBtn = document.getElementById("open-issues-btn");
const closedIssuesBtn = document.getElementById("closed-issues-btn");

const openIssuesSection = document.getElementById("open-issues-section");
const closedIssuesSection = document.getElementById("closed-issues-section");


function toggoleStyle(id) {
    console.log(id)
    allIssuesBtn.classList.add('bg-white', 'text-black');
    openIssuesBtn.classList.add('bg-white', 'text-black');
    closedIssuesBtn.classList.add('bg-white', 'text-black');

    allIssuesBtn.classList.remove('bg-blue-500', 'text-white');
    openIssuesBtn.classList.remove('bg-blue-500', 'text-white');
    closedIssuesBtn.classList.remove('bg-blue-500', 'text-white');

    // openIssuesSection.classList.add("hidden");
    // closedIssuesSection.classList.add("hidden");

    if (id == 'all-issues-btn') {
        openIssuesBtn.classList.remove('bg-blue-500', 'text-white');
        closedIssuesBtn.classList.remove('bg-blue-500', 'text-white');
        allIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.add('bg-blue-500', 'text-white');
    } else if(id =="open-issues-btn"){
        closedIssuesBtn.classList.remove('bg-blue-500', 'text-white');
        openIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.remove('bg-blue-500', 'text-white');
        openIssuesBtn.classList.add('bg-blue-500', 'text-white');
        

    }else if(id=='closed-issues-btn'){
         closedIssuesBtn.classList.add('bg-blue-500', 'text-white');
        closedIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.remove('bg-blue-500', 'text-white');
        openIssuesBtn.classList.remove('bg-blue-500', 'text-white');
       
        

    }




}