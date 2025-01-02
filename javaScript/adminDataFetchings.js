document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".menuContent button");
    const adminContent = document.querySelector(".adminContent");
    const trainerForm = document.querySelector(".trainerForm"); 

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const endpoints = ["requests", "users", "trainers", "services","schedule","news","discounts"];
            const endpoint = endpoints[index];
            if (endpoint) {
                fetchData(endpoint);
            } else {
                console.error('Invalid index:', index);
            }
        });
    });
    
    const form = document.querySelector("#trainerForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 
    
        
        const name = document.querySelector("#name").value;
        const surname = document.querySelector("#surname").value;
        const specialty = document.querySelector("#specialty").value;
        console.log(name, surname, specialty);
    
        try {
            const response = await fetch("php/add_trainer.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    specialty: specialty
                }) 
            });
    
            const result = await response.json();
    
            if (result.success) {
                
                trainerForm.classList.add("hidden");
    
                
                fetchData("trainers");
            } else {
                alert(result.message); 
            }
        } catch (error) {
            alert("Error adding trainer: " + error.message);
        }
    });
    


    async function fetchData(endpoint) {
        try {
            adminContent.innerHTML = "<p>Loading...</p>"; 
            let response = await fetch(`api.php?endpoint=${endpoint}`);

            if (endpoint === "schedule"){
                response = await fetch(`api.php?endpoint=${"services"}`);
            };
        
            if (!response.ok) {
                const errorData = await response.json();
                adminContent.innerHTML = `<p>Error: ${errorData.error || 'Failed to fetch data.'}</p>`;
                return;
            }
        
            const data = await response.json();
        
            renderData(endpoint, data);
        } catch (error) {
            adminContent.innerHTML = `<p>Failed to load data. Error: ${error.message}</p>`;
        }
    }
    
    
    


    function renderData(endpoint, data) {
        
        if ( data.length === 0) {
            adminContent.innerHTML = "<p>No data available.</p>";
            return;
        }

        if (endpoint === "users") {
            renderUsers(data);
        } else if (endpoint === "requests") {
            
            renderRequests(data);
        } else if ( endpoint === "trainers"){
            renderTrainers(data);
        } else if ( endpoint === "services"){
            renderServices(data);
        } else if ( endpoint === "schedule"){
            renderSchedule(data);
        } else if (endpoint ==="news"){
            renderNews(data);
        } else if (endpoint ==="discounts"){
            renderDiscounts(data);
        } else {
            adminContent.innerHTML = `<div><h2>${endpoint} Section</h2></div>`;
        }
    }

    function renderDiscounts(discounts) {
        const html = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Προσφορές</h3>
            </div>
            
            <div class="sectionData">
            <div class="dataContainer">
                ${discounts
                    .map(
                        (discount) => `
                    
                    <div class="dataCard" data-id="${discount.id || 'unknown'}">
                        <div class="mainData">
                            <div class="infoData">
                                <p><span>Προσφορά:</span> ${discount.info || "N/A"}</p>
                                </div>
                            <div class="actionsData">
                                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                                <div class="additionalActions">
                                    <button class="delete" onclick="deleteItem('discounts', ${discount.id})"><i class="fa-solid fa-trash-can"></i></button>
                                    <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                `
                    )
                    .join("")}
            </div>
            <button class="addService">Προσθήκη</button>
            </div>`;
        adminContent.innerHTML = html;
        attachEventListeners();
    }


    function renderNews(announcements) {
        const html = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Ανακοινώσεις</h3>
            </div>
            <div class="sectionData">
                <div class="dataContainer">
                ${announcements
                    .map(
                        (announcement) => `
                    
                    <div class="dataCard" data-id="${announcement.id || 'unknown'}">
                        <div class="mainData">
                            <div class="infoData">
                                <p><span>Ανακοίνωση:</span> ${announcement.info || "N/A"}</p>
                                </div>
                            <div class="actionsData">
                                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                                <div class="additionalActions">
                                    <button class="delete" onclick="deleteItem('announcements', ${announcement.id})"><i class="fa-solid fa-trash-can"></i></button>
                                    <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    )
                    .join("")}
                </div>
                <button class="addService">Προσθήκη</button>
            </div>`;
        adminContent.innerHTML = html;
        attachEventListeners();
    }

    function renderSchedule(services) {
    
        const soloServicesHtml = 
        services.solo_services.map(
                (service) => `
                <div class="dataCard" data-id="${service.id || 'unknown'}">
                    <div class="mainData">
                        <div class="infoData">
                            <p><span>Πρόγραμμα:</span> ${service.service_name}</p>
                        </div>
                        <div class="actionsData">
                            <button class="edit"><i class="fa-solid fa-pen"></i></button>
                            <div class="additionalActions">
                                <button class="delete" onclick="deleteItem('solo_services', ${service.id})"><i class="fa-solid fa-trash-can"></i></button>
                                <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
            .join("");
    
        const teamServicesHtml = services.team_services
            .map(
                (service) => `
                <div class="dataCard" data-id="${service.id || 'unknown'}">
                    <div class="mainData">
                        <div class="infoData">
                            <p><span>Πρόγραμμα:</span> ${service.service_name}</p>
                            <p><span>Ημέρες:</span> ${service.days_of_week}</p>
                            <p><span>Ώρες:</span> ${service.times}</p>
                        </div>
                        <div class="actionsData">
                            <button class="edit"><i class="fa-solid fa-pen"></i></button>
                            <div class="additionalActions">
                                    <button class="delete" onclick="deleteItem('team_services', ${service.id})"><i class="fa-solid fa-trash-can"></i></button>
                                <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
            .join("");
    
        adminContent.innerHTML = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Πρόγραμμα</h3>
            </div>
                <div class="adminServices">
                    <div class="solo">
                        <h3>Ατομικά Προγράμματα</h3>
                        <div class="servicesShow">
                            ${soloServicesHtml}
                        </div>
                    </div>
                    <div class="teams">
                        <h3>Ομαδικά Προγράμματα</h3>
                        <div class="servicesShow">
                            ${teamServicesHtml}
                        </div>
                    </div>
                </div>


            
        `;
    }

    function renderServices(services) {
       
    
        const soloServicesHtml = services.solo_services
            .map(
                (service) => `
                <div class="dataCard" data-id="${service.id || 'unknown'}">
                    <div class="mainData">
                        <div class="infoData">
                            <p><span>Υπηρεσία:</span> ${service.service_name}</p>
                        </div>
                        <div class="actionsData">
                            <button class="edit"><i class="fa-solid fa-pen"></i></button>
                            <div class="additionalActions">
                                <button class="delete" onclick="deleteItem('solo_services', ${service.id})"><i class="fa-solid fa-trash-can"></i></button>
                                <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
            .join("");
    
        const teamServicesHtml = services.team_services
            .map(
                (service) => `
                <div class="dataCard" data-id="${service.id || 'unknown'}">
                    <div class="mainData">
                        <div class="infoData">
                            <p><span>Υπηρεσία:</span> ${service.service_name}</p>
                            <p><span>Προπονητής:</span> ${service.trainer_name} ${service.trainer_surname}</p>
                        </div>
                        <div class="actionsData">
                            <button class="edit"><i class="fa-solid fa-pen"></i></button>
                            <div class="additionalActions">
                                <button class="delete" onclick="deleteItem('team_services', ${service.id})"><i class="fa-solid fa-trash-can"></i></button>
                                <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
            .join("");
    
        adminContent.innerHTML = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Υπηρεσίες</h3>
            </div>
        
            <div class="adminServices">
                <div class="solo">
                    <h3>Ατομικά Προγράμματα</h3>
                    <div class="servicesShow">
                        ${soloServicesHtml}
                        <button class="addService">Προσθήκη</button>
                    </div>
                </div>
                <div class="teams">
                    <h3>Ομαδικά Προγράμματα</h3>
                    <div class="servicesShow">
                        ${teamServicesHtml}
                        <button class="addService">Προσθήκη</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    

    function renderTrainers(trainers) {
        const html = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Γυμναστές</h3>
            </div>
            <div class="sectionData">
                ${trainers
                    .map(
                        (trainer) => `
                    <div class="dataContainer">
                        <div class="dataCard" data-id="${trainer.id || 'unknown'}">
                            <div class="mainData">
                                <div class="infoData">
                                    <p><span>Όνομα:</span> ${trainer.name || "N/A"}</p>
                                    <p><span>Επώνυμο:</span> ${trainer.surname || "N/A"}</p>
                                    <p><span>Ειδικότητα:</span>${trainer.specialty || "N/A"}</p>
                                    </div>
                                <div class="actionsData">
                                    <button class="edit"><i class="fa-solid fa-pen"></i></button>
                                    <div class="additionalActions">
                                        <button class="delete" onclick="deleteItem('trainers', ${trainer.id})">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                        <button style="display: none;" class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                    )
                    .join("")}
                    <button class="addService" id="add-trainer-btn" onclick="showTrainer()">Προσθήκη</button>
            </div>`;
        adminContent.innerHTML = html;
        attachEventListeners();
    }

    function renderUsers(users) {
        const html = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Χρήστες</h3>
            </div>
            <div class="sectionData">
                ${users
                    .map(
                        (user) => `
                    <div class="dataContainer">
                    <div class="dataCard" data-id="${user.id || 'unknown'}">
                        <div class="mainData">
                            <div class="infoData">
                                <p><span>Όνομα:</span> ${user.name || "N/A"}</p>
                                <p><span>Επώνυμο:</span> ${user.surname || "N/A"}</p>
                            </div>
                            <div class="actionsData">
                                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                                <div class="additionalActions">
                                    <button class="delete" onclick="deleteItem('trainers', ${user.id})">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="expand"><img src="assets/icons/down arrow.png" alt="Expand"></button>
                                </div>
                            </div>
                        </div>
                        <div class="secondaryData">
                            <p class="more">Περισσότερα στοιχεία</p>
                            <div class="restData">
                                <p><span>Χώρα:</span> ${user.country || "N/A"} <span>Διεύθυνση:</span> ${user.address || "N/A"}</p>
                                <p><span>Πόλη:</span> ${user.city || "N/A"} <span>e-mail:</span> ${user.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                `
                    )
                    .join("")}
            </div>`;
        adminContent.innerHTML = html;
        attachEventListeners();
    }

    function renderRequests(requests) {
        const html = `
            <div class="sectionTitle">
                <h3><button id="filterIcon" class="filterToggle none"><i class="fa-solid fa-bars"></i></button> Αιτήματα</h3>
            </div>
            <div class="sectionData">
                <div class="dataContainer">
                    ${requests
                        .map(
                            (request) => `
                            <div class="dataCard" data-id="${request.id || 'unknown'}">
                                <div class="mainData">
                                    <div class="infoData">
                                        <p><span>Όνομα:</span> ${request.name || "N/A"}</p>
                                        <p><span>Επώνυμο:</span> ${request.surname || "N/A"}</p>
                                    </div>
                                    <div class="actionsData">
                                        <form id="approveForm" action="../php/approve_user.php" method="POST">
                                            <select name="role" id="roles" required>
                                                <option value="" disabled selected>Roles</option>
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <input type="hidden" name="user_id" value="${request.id}">
                                            <button class="accept" type="submit">
                                                <i class="fa-solid fa-circle-check"></i>
                                            </button>
                                        </form>
                                        <div class="additionalActions">
                                            <button class="delete" onclick="deleteItem('queue', ${request.id})">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                            <button class="expand">
                                                <img src="assets/icons/down arrow.png" alt="">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="secondaryData">
                                    <p class="more">Περισσότερα στοιχεία</p>
                                    <div class="restData">
                                        <p><span>Χώρα:</span> ${request.country || "N/A"} <span>Διεύθυνση:</span> ${request.address || "N/A"}</p>
                                        <p><span>Πόλη:</span> ${request.city || "N/A"} <span>e-mail:</span> ${request.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            
                        `
                        )
                        .join("")}
                        
                </div>
            </div>`;
        adminContent.innerHTML = html;
        attachEventListeners();
    }
    

    function attachEventListeners() {
        const deleteButtons = document.querySelectorAll(".delete");
        const expandButtons = document.querySelectorAll(".expand");
        const forms = document.querySelectorAll("form"); 
    
        // deleteButtons.forEach((button) => {
        //     button.addEventListener("click", async (e) => {
        //         const card = e.target.closest(".dataCard");
        //         const userId = card.getAttribute("data-id");
    
        //         try {
        //             const response = await fetch(`api.php?endpoint=deleteUser`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 body: JSON.stringify({ id: userId }),
        //             });
    
        //             if (!response.ok) {
        //                 throw new Error("Failed to delete user");
        //             }
    
        //             const result = await response.json();
        //             if (result.success) {
        //                 card.remove();
        //                 console.log("User deleted successfully");
        //             } else {
        //                 console.error("Error deleting user:", result.message);
        //             }
        //         } catch (error) {
        //             console.error("Error:", error.message);
        //         }
        //     });
        // });
    
        // forms.forEach((form) => {
        //     form.addEventListener("submit", async (e) => {
        //         e.preventDefault(); 
        
        //         const formData = new FormData(form);
        //         const data = Object.fromEntries(formData.entries());
        
        //         const userId = form.querySelector("input[name='user_id']").value;
        //         const role = form.querySelector("select[name='role']").value;
        
        //         data.id = userId;
        //         data.role = role;
        
        
        //         try {
        //             const response = await fetch('api.php?endpoint=addUser', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify(data),
        //             });
        
        //             const responseData = await response.json();  
        
        //             if (!response.ok) {
        //                 console.error('Error:', responseData.error || 'Failed to submit form');
        //                 return;
        //             }
        
        
        //         } catch (error) {
        //             console.error('Error:', error.message);
        //         }
        //     });
        // });
        
        
    
        const dataCards = document.querySelectorAll('.dataCard'); 
    
        dataCards.forEach((card) => {
            const expandBtn = card.querySelector('.expand'); 
            expandBtn.addEventListener('click', () => { 
                const secondaryData = card.querySelectorAll('.secondaryData');
                secondaryData.forEach((data) => {
                    data.classList.toggle('expanded');
                });
    
                expandBtn.classList.toggle('rotate');
            });
        });
    }
    
});