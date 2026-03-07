
const allIssuesBtn = document.getElementById("all-issues-btn");
const openIssuesBtn = document.getElementById("open-issues-btn");
const closedIssuesBtn = document.getElementById("closed-issues-btn");

const allIssuesSection = document.getElementById("all-issues-section")
const openIssuesSection = document.getElementById("open-issues-section");
const closedIssuesSection = document.getElementById("closed-issues-section");

const allCountIssues = document.getElementById("allIssues");
const openCountIssues = document.getElementById("openIssues");
const closedCountIssues = document.getElementById("closedIssues")


function toggoleStyle(id) {
    console.log(id)
    allIssuesBtn.classList.add('bg-white', 'text-black');
    openIssuesBtn.classList.add('bg-white', 'text-black');
    closedIssuesBtn.classList.add('bg-white', 'text-black');

    allIssuesBtn.classList.remove('bg-blue-700', 'text-white');
    openIssuesBtn.classList.remove('bg-blue-700', 'text-white');
    closedIssuesBtn.classList.remove('bg-blue-700', 'text-white');

    openIssuesSection.classList.add("hidden");
    closedIssuesSection.classList.add("hidden");

    if (id == 'all-issues-btn') {
        openIssuesBtn.classList.remove('bg-blue-700', 'text-white');
        closedIssuesBtn.classList.remove('bg-blue-700', 'text-white');
        allIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.add('bg-blue-700', 'text-white');

        allIssuesSection.classList.remove("hidden");
        openIssuesSection.classList.add("hidden");
        closedIssuesSection.classList.add("hidden");

        allCountIssues.classList.remove("hidden");
        openCountIssues.classList.add("hidden");
        closedCountIssues.classList.add("hidden");

    } else if (id == "open-issues-btn") {
        closedIssuesBtn.classList.remove('bg-blue-700', 'text-white');
        openIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.remove('bg-blue-700', 'text-white');
        openIssuesBtn.classList.add('bg-blue-700', 'text-white');

        openIssuesSection.classList.remove("hidden");
        allIssuesSection.classList.add("hidden");
        closedIssuesSection.classList.add("hidden");

        openCountIssues.classList.remove("hidden");
        allCountIssues.classList.add("hidden");
        closedCountIssues.classList.add("hidden");


    } else if (id == 'closed-issues-btn') {
        closedIssuesBtn.classList.add('bg-blue-700', 'text-white');
        closedIssuesBtn.classList.remove('bg-white', 'text-black');
        allIssuesBtn.classList.remove('bg-blue-700', 'text-white');
        openIssuesBtn.classList.remove('bg-blue-700', 'text-white');

        closedIssuesSection.classList.remove("hidden");
        allIssuesSection.classList.add("hidden");
        openIssuesSection.classList.add("hidden");

        closedCountIssues.classList.remove("hidden");
        allCountIssues.classList.add("hidden");
        openCountIssues.classList.add("hidden");

    }

}





async function allIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayAllIssues(data.data)
}
function displayAllIssues(issues) {
    console.log(issues)
    allIssuesSection.innerHTML = "";
    issues.forEach((issue) => {
        const card = document.createElement("div")
        let priority = issue.priority ? issue.priority.trim() : '';
        let priorityClass = priority === 'high' ? 'badge-error' : priority === 'medium' ? 'badge-info' : 'badge-primary';
        let borderClass = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
        card.innerHTML = `
             <div class="card shadow-md space-y-2 bg-white p-3 border-t-4 w-full h-full ${borderClass}">
                <div class="flex justify-between mb-3">
                    <div>
                        <img src="./assets/Open-Status.png" alt="">
                    </div>
                    <div
                        class="badge badge-soft font-medium ${priorityClass}">
                        ${issue.priority}</div>
                </div>
                <h3 class="text-lg font-bold">${issue.title}</h3>
                <p class="opacity-50">${issue.description}</p>

                 <div class="flex gap-2">
                        ${issue.labels.map(label => `
                            <div class="badge badge-soft ${label === 'bug' ? 'badge-warning' : label === 'help wanted' ? 'badge-accent' : label === 'enhancement' ? 'badge-success' : label === 'documentation' ? 'badge-secondary' : 'badge-accent'}">${label}</div>

                            `
        ).join('')}     
               </div>
                <hr class="border-gray-300">
                <p class="opacity-50">${issue.author}</p>
                <p class="opacity-50">${issue.updatedAt}</p>



            </div>
        `;
        allIssuesSection.appendChild(card);

     
    });
    allCountIssues.innerText = issues.length;
   
}


allIssues()