
const allIssuesBtn = document.getElementById("all-issues-btn");
const openIssuesBtn = document.getElementById("open-issues-btn");
const closedIssuesBtn = document.getElementById("closed-issues-btn");

const allIssuesSection = document.getElementById("all-issues-section")
const openIssuesSection = document.getElementById("open-issues-section");
const closedIssuesSection = document.getElementById("closed-issues-section");

const allCountIssues = document.getElementById("allIssues");
const openCountIssues = document.getElementById("openIssues");
const closedCountIssues = document.getElementById("closedIssues")

const loadingSection = document.getElementById("loadingSection")

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
    allIssuesSection.innerHTML = "";
    openIssuesSection.innerHTML = "";
    closedIssuesSection.innerHTML = "";
    loadingSection.classList.remove("hidden");
    issues.forEach((issue) => {
        const card = document.createElement("div")
        const priority = issue.priority ? issue.priority.trim() : '';
        const borderClass = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
        const priorityClass = priority === 'high' ? 'badge-secondary' : priority === 'medium' ? 'badge-primary' : 'badge-neutral';
        const cardImg = issue.status === 'open' ? '<img src="./assets/Open-Status.png" alt="Open Status">' :
            '<img src="./assets/Closed- Status .png" alt="">';
        card.innerHTML = `
             <div onclick ="modal(${issue.id})" class="card shadow-md space-y-2 bg-white p-3 border-t-4 w-full h-full ${borderClass}">
                <div class="flex justify-between mb-3">
                    <div>
                        ${cardImg}
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
        loadingSection.classList.add("hidden")

        if (issue.status === "open") {
            loadingSection.classList.remove("hidden");
            const card = document.createElement("div")
            card.innerHTML = `
             <div onclick ="modal(${issue.id})" class="card shadow-md space-y-2 bg-white p-3 border-t-4 w-full h-full ${borderClass}">
                <div class="flex justify-between mb-3">
                    <div>
                        ${cardImg}
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
            openIssuesSection.appendChild(card);
            loadingSection.classList.add("hidden");
        } else {
            loadingSection.classList.remove("hidden");
            const card = document.createElement("div")
            card.innerHTML = `
             <div onclick ="modal(${issue.id})" class="card shadow-md space-y-2 bg-white p-3 border-t-4 w-full h-full ${borderClass}">
                <div class="flex justify-between mb-3">
                    <div>
                        ${cardImg}
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
            closedIssuesSection.appendChild(card);
            loadingSection.classList.add("hidden");
        }


    });
    allCountIssues.innerText = issues.length;
    const openIssues = issues.filter(issue => issue.status === "open");
    openCountIssues.innerText = openIssues.length;

    const closedIssues = issues.filter(issue => issue.status === "closed");
    closedCountIssues.innerText = closedIssues.length;
}

async function modal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();
    displayModal(data.data)
}
function displayModal(data) {
    const modalContainer = document.getElementById('modal-container');
    const priority = data.priority ? data.priority.trim() : '';
    const priorityClass = priority === 'high' ? 'badge-secondary' : priority === 'medium' ? 'badge-primary' : 'badge-neutral';
    const statusColor = data.status === 'open' ? 'bg-green-500 text-white text-sm' : 'bg-purple-500 text-white text-sm';

    modalContainer.innerHTML = `
        <div class="rounded-t pt-4  space-y-3">
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold">${data.title}</h3>
                
            </div>
            <div class="flex items-center gap-2 mb-2">
                <div class="badge ${statusColor}">${data.status}</div>
                <i class="fa-solid fa-circle text-[10px]"></i>
                <p>Opened by ${data.author}</p >
                <i class="fa-solid fa-circle text-[10px]"></i>
                <p>${data.updatedAt}</p>
            </div >
            <div class="flex gap-2">
                        ${data.labels.map(label => `
                            <div class="badge badge-soft ${label === 'bug' ? 'badge-warning' : label === 'help wanted' ? 'badge-accent' : label === 'enhancement' ? 'badge-success' : label === 'documentation' ? 'badge-secondary' : 'badge-accent'}">${label}</div>

                            `
                 ).join('')}     
               </div>

            <p class="mb-3">${data.description}</p>
            <div class="card bg-[#F1F2F4]">
                <div class="card-body grid grid-cols-2">
                    <div>
                        <p>Assignee: </p>
                        <p class="font-semibold">Fahim Ahmed</p>
                    </div>
                    <div>
                        <p>Priority: </p>
                        <div class="badge ${priorityClass} ">${priority}</div>
                    </div>
                </div>
            </div>
        `;

    document.getElementById("modal-section").showModal();
}
allIssues()
modal()

document.getElementById("btn-search").addEventListener('click', () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    if (!searchValue) {
        allIssues();
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.data;
            const filtarCards = allCards.filter(word => word.description.toLowerCase)

            displayAllIssues(filtarCards)
        })
})