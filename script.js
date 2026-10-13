let currentRole = "";
let currentPage = "dashboard";
let authMode = "login";

const users = {
    admin: {
        name: "Dr. Maria Meija",
        role: "Dentist Admin",
        initials: "MM",
        email: "admin@clinick.com"
    },
    staff: {
        name: "Chadwick Sarmiento",
        role: "Staff",
        initials: "CS",
        email: "staff@clinick.com"
    },
    patient: {
        name: "Billy Joe Antonio",
        role: "Patient",
        initials: "BJ",
        email: "patient@clinick.com"
    }
};

const navigation = {
    admin: [
        ["dashboard", "Dashboard"],
        ["appointments", "Appointments"],
        ["patients", "Patients"],
        ["insurance", "Insurance"],
        ["notifications", "Notifications"],
        ["settings", "Settings"]
    ],
    staff: [
        ["dashboard", "Dashboard"],
        ["appointments", "Appointments"],
        ["patients", "Patients"],
        ["insurance", "Insurance"],
        ["notifications", "Notifications"]
    ],
    patient: [
        ["dashboard", "Home"],
        ["book", "Book Appointment"],
        ["my-appointments", "My Visits"],
        ["insurance", "Insurance"],
        ["notifications", "Notifications"],
        ["profile", "Profile"]
    ]
};

function openAuth(role) {
    currentRole = role;

    const roleData = users[role];

    document.getElementById("authRole").textContent = roleData.role;
    document.getElementById("authIcon").textContent = roleData.initials.charAt(0);

    document.getElementById("authModal").classList.add("active");

    showLoginForm();
}

function closeAuth() {
    document.getElementById("authModal").classList.remove("active");
}

function showLoginForm() {
    authMode = "login";

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");

    document.getElementById("nameField").classList.add("hidden");
    document.getElementById("confirmField").classList.add("hidden");

    document.getElementById("authName").required = false;
    document.getElementById("authConfirm").required = false;

    document.getElementById("authTitle").textContent = "Welcome back";
    document.getElementById("authSubtitle").textContent = "Login to continue to your dashboard.";
    document.getElementById("authSubmit").textContent = "Login";
}

function showRegisterForm() {
    authMode = "register";

    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");

    document.getElementById("nameField").classList.remove("hidden");
    document.getElementById("confirmField").classList.remove("hidden");

    document.getElementById("authName").required = true;
    document.getElementById("authConfirm").required = true;

    document.getElementById("authTitle").textContent = "Create account";
    document.getElementById("authSubtitle").textContent = "Register to access the Clinick system.";
    document.getElementById("authSubmit").textContent = "Create Account";
}

function submitAuth(event) {
    event.preventDefault();

    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value.trim();

    if (!email || !password) {
        alert("Please complete all required fields.");
        return;
    }

    if (authMode === "register") {
        const name = document.getElementById("authName").value.trim();
        const confirm = document.getElementById("authConfirm").value.trim();

        if (!name) {
            alert("Please enter your full name.");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        users[currentRole].name = name;
        users[currentRole].email = email;
        users[currentRole].initials = getInitials(name);

        alert("Account created successfully.");
    }

    login();
}

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}

function login() {
    closeAuth();

    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    updateUser();
    renderNavigation();

    currentPage = "dashboard";
    navigate("dashboard");

    updateDate();
}

function logout() {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");

    document.getElementById("authEmail").value = "";
    document.getElementById("authPassword").value = "";
    document.getElementById("authName").value = "";
    document.getElementById("authConfirm").value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function updateUser() {
    const user = users[currentRole];

    document.getElementById("userName").textContent = user.name;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userAvatar").textContent = user.initials;
}

function renderNavigation() {
    const nav = document.getElementById("mainNavigation");

    nav.innerHTML = navigation[currentRole]
        .map(item => {
            return `
                <button class="nav-item" id="nav-${item[0]}" onclick="navigate('${item[0]}')">
                    ${item[1]}
                </button>
            `;
        })
        .join("");
}

function navigate(page) {
    currentPage = page;

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.remove("active");
    });

    const activeButton = document.getElementById(nav-${page});

    if (activeButton) {
        activeButton.classList.add("active");
    }

    renderPage();
}

function renderPage() {
    const content = document.getElementById("pageContent");

    const pages = {
        dashboard: dashboardPage,
        appointments: appointmentsPage,
        patients: patientsPage,
        book: bookPage,
        "my-appointments": myAppointmentsPage,
        insurance: insurancePage,
        notifications: notificationsPage,
        profile: profilePage,
        settings: settingsPage
    };

    const pageFunction = pages[currentPage];

    if (pageFunction) {
        content.innerHTML = pageFunction();
    }

    setTitle();
}

function setTitle() {
    const titles = {
        dashboard: ["Dashboard", "Welcome to your clinic dashboard."],
        appointments: ["Appointments", "View and manage clinic appointments."],
        patients: ["Patients", "Manage patient information and records."],
        book: ["Book Appointment", "Schedule your next dental visit."],
        "my-appointments": ["My Visits", "View your upcoming and previous visits."],
        insurance: ["Insurance", "Check insurance verification information."],
        notifications: ["Notifications", "View your latest clinic updates."],
        profile: ["Profile", "Manage your personal information."],
        settings: ["Settings", "Manage system settings."]
    };

    const data = titles[currentPage] || titles.dashboard;

    document.getElementById("pageTitle").textContent = data[0];
    document.getElementById("pageDescription").textContent = data[1];
}

function updateDate() {
    const date = new Date();

    document.getElementById("headerDate").textContent =
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
}

function dashboardPage() {
    const user = users[currentRole];

    if (currentRole === "patient") {
        return `
            <div class="dashboard-welcome">
                <span>Patient Portal</span>
                <h2>Welcome back, ${user.name.split(" ")[0]}.</h2>
                <p>Manage your dental appointments and clinic information.</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <span>Upcoming Visit</span>
                    <strong>01</strong>
                    <small>Scheduled appointment</small>
                </div>

                <div class="stat-card">
                    <span>Past Visits</span>
                    <strong>04</strong>
                    <small>Completed appointments</small>
                </div>

                <div class="stat-card">
                    <span>Insurance</span>
                    <strong>✓</strong>
                    <small>Verification complete</small>
                </div>
            </div>

            <div class="content-grid">
                <div class="panel">
                    <div class="panel-header">
                        <h3>Your next appointment</h3>
                        <span>CONFIRMED</span>
                    </div>

                    <div class="appointment-row">
                        <div class="appointment-time">10:30 AM</div>

                        <div class="appointment-person">
                            <strong>Dr. Maria Meija</strong>
                            <span>Dental Cleaning · October 8, 2026</span>
                        </div>

                        <div class="status">Confirmed</div>
                    </div>
                </div>

                <div class="panel">
                    <div class="panel-header">
                        <h3>Quick actions</h3>
                    </div>

                    <div class="action-grid">
                        <button class="action-card" onclick="navigate('book')">
                            <strong>Book Visit</strong>
                            <span>Schedule a new appointment.</span>
                        </button>

                        <button class="action-card" onclick="navigate('insurance')">
                            <strong>Insurance</strong>
                            <span>Check your verification.</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="dashboard-welcome">
            <span>${user.role}</span>
            <h2>Good day, ${user.name.split(" ")[0]}.</h2>
            <p>Here is your clinic overview for today.</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <span>Appointments</span>
                <strong>12</strong>
                <small>Scheduled today</small>
            </div>

            <div class="stat-card">
                <span>Patients</span>
                <strong>86</strong>
                <small>Registered patients</small>
            </div>

            <div class="stat-card">
                <span>Insurance</span>
                <strong>24</strong>
                <small>Pending verification</small>
            </div>
        </div>

        <div class="content-grid">

            <div class="panel">
                <div class="panel-header">
                    <h3>Today's appointments</h3>
                    <span>VIEW ALL</span>
                </div>

                <div class="appointment-list">

                    <div class="appointment-row">
                        <div class="appointment-time">09:00 AM</div>
                        <div class="appointment-person">
                            <strong>Juan Dela Cruz</strong>
                            <span>Dental Cleaning</span>
                        </div>
                        <div class="status">Confirmed</div>
                    </div>

                    <div class="appointment-row">
                        <div class="appointment-time">10:30 AM</div>
                        <div class="appointment-person">
                            <strong>Maria Santos</strong>
                            <span>Dental Check-up</span>
                        </div>
                        <div class="status">Pending</div>
                    </div>

                    <div class="appointment-row">
                        <div class="appointment-time">01:00 PM</div>
                        <div class="appointment-person">
                            <strong>Pedro Garcia</strong>
                            <span>Tooth Extraction</span>
                        </div>
                        <div class="status">Confirmed</div>
                    </div>

                    <div class="appointment-row">
                        <div class="appointment-time">03:30 PM</div>
                        <div class="appointment-person">
                            <strong>Sofia Reyes</strong>
                            <span>Dental Consultation</span>
                        </div>
                        <div class="status">Pending</div>
                    </div>

                </div>
            </div>

            <div class="panel">
                <div class="panel-header">
                    <h3>Quick actions</h3>
                </div>

                <div class="action-grid">
                    <button class="action-card" onclick="navigate('appointments')">
                        <strong>Appointments</strong>
                        <span>Review today's schedule.</span>
                    </button>

                    <button class="action-card" onclick="navigate('patients')">
                        <strong>Patients</strong>
                        <span>View patient records.</span>
                    </button>

                    <button class="action-card" onclick="navigate('insurance')">
                        <strong>Insurance</strong>
                        <span>Review verification requests.</span>
                    </button>

                    <button class="action-card" onclick="navigate('notifications')">
                        <strong>Notifications</strong>
                        <span>Check recent updates.</span>
                    </button>
                </div>
            </div>

        </div>
    `;
}

function appointmentsPage() {
    return `
        <div class="page-card">
            <div class="panel-header">
                <div>
                    <h3>Appointment Schedule</h3>
                    <p>Manage today's dental appointments.</p>
                </div>

                ${currentRole === "patient" ? <button class="primary-button" onclick="navigate('book')">Book Appointment</button> : ""}
            </div>

            <table class="data-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Service</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>09:00 AM</td>
                        <td>Juan Dela Cruz</td>
                        <td>Dental Cleaning</td>
                        <td><span class="status">Confirmed</span></td>
                    </tr>

                    <tr>
                        <td>10:30 AM</td>
                        <td>Maria Santos</td>
                        <td>Dental Check-up</td>
                        <td><span class="status">Pending</span></td>
                    </tr>

                    <tr>
                        <td>01:00 PM</td>
                        <td>Pedro Garcia</td>
                        <td>Tooth Extraction</td>
                        <td><span class="status">Confirmed</span></td>
                    </tr>

                    <tr>
                        <td>03:30 PM</td>
                        <td>Sofia Reyes</td>
                        <td>Consultation</td>
                        <td><span class="status">Pending</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function patientsPage() {
    return `
        <div class="page-card">
            <div class="panel-header">
                <div>
                    <h3>Patient Records</h3>
                    <p>View registered patients in the clinic.</p>
                </div>

                <button class="primary-button" onclick="demoMessage('Add patient feature is available in the prototype.')">
                    Add Patient
                </button>
            </div>

            <table class="data-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Contact</th>
                        <th>Last Visit</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Juan Dela Cruz</td>
                        <td>juan@email.com</td>
                        <td>October 1, 2026</td>
                        <td><span class="status">Active</span></td>
                    </tr>

                    <tr>
                        <td>Maria Santos</td>
                        <td>maria@email.com</td>
                        <td>September 28, 2026</td>
                        <td><span class="status">Active</span></td>
                    </tr>

                    <tr>
                        <td>Pedro Garcia</td>
                        <td>pedro@email.com</td>
                        <td>September 22, 2026</td>
                        <td><span class="status">Active</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function bookPage() {
    return `
        <div class="page-card">
            <h3>Book a Dental Appointment</h3>
            <p>Choose your preferred service and schedule.</p>

            <form onsubmit="demoSubmit(event)">
                <div class="form-grid">

                    <div class="input-field">
                        <label>Dental Service</label>
                        <select required>
                            <option value="">Select service</option>
                            <option>Dental Cleaning</option>
                            <option>Dental Check-up</option>
                            <option>Tooth Extraction</option>
                            <option>Dental Consultation</option>
                            <option>Oral Examination</option>
                        </select>
                    </div>

                    <div class="input-field">
                        <label>Preferred Dentist</label>
                        <select required>
                            <option value="">Select dentist</option>
                            <option>Dr. Maria Meija</option>
                            <option>Dr. Domingo</option>
                        </select>
                    </div>

                    <div class="input-field">
                        <label>Date</label>
                        <input type="date" required>
                    </div>

                    <div class="input-field">
                        <label>Preferred Time</label>
                        <input type="time" required>
                    </div>

                    <div class="input-field full-field">
                        <label>Reason for Visit</label>
                        <textarea placeholder="Enter additional information"></textarea>
                    </div>

                    <div class="full-field">
                        <button class="primary-button" type="submit">Submit Appointment</button>
                    </div>

                </div>
            </form>
        </div>
    `;
}

function myAppointmentsPage() {
    return `
        <div class="page-card">
            <div class="panel-header">
                <div>
                    <h3>My Appointments</h3>
                    <p>Your upcoming and previous dental visits.</p>
                </div>

                <button class="primary-button" onclick="navigate('book')">Book New Visit</button>
            </div>

            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Dentist</th>
                        <th>Service</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>October 8, 2026</td>
                        <td>Dr. Maria Meija</td>
                        <td>Dental Cleaning</td>
                        <td><span class="status">Confirmed</span></td>
                    </tr>

                    <tr>
                        <td>September 15, 2026</td>
                        <td>Dr. Maria Meija</td>
                        <td>Check-up</td>
                        <td><span class="status">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function insurancePage() {
    return `
        <div class="content-grid">

            <div class="page-card">
                <h3>Insurance Verification</h3>
                <p>Review your current insurance information.</p>

                <div class="info-list" style="margin-top:20px;">
                    <div class="info-item">
                        <span>Insurance Provider</span>
                        <strong>PhilHealth</strong>
                    </div>

                    <div class="info-item">
                        <span>Member Number</span>
                        <strong>PH-2026-00125</strong>
                    </div>

                    <div class="info-item">
                        <span>Verification Status</span>
                        <strong style="color:#176b6f;">Verified</strong>
                    </div>
                </div>
            </div>

            <div class="page-card">
                <h3>Verification Notice</h3>

                <div class="notice">
                    Your insurance information has been verified for the current appointment.
                </div>

                <button class="primary-button" style="margin-top:18px;" onclick="demoMessage('Insurance verification request submitted.')">
                    Request Verification
                </button>
            </div>

        </div>
    `;
}

function notificationsPage() {
    return `
        <div class="page-card">
            <h3>Notifications</h3>
            <p>Recent updates from the clinic.</p>

            <div class="info-list" style="margin-top:20px;">

                <div class="info-item">
                    <span>Today</span>
                    <strong>Your dental appointment is confirmed for October 8, 2026.</strong>
                </div>

                <div class="info-item">
                    <span>Yesterday</span>
                    <strong>Your insurance verification has been completed.</strong>
                </div>

                <div class="info-item">
                    <span>September 30</span>
                    <strong>A new clinic schedule has been posted.</strong>
                </div>

            </div>
        </div>
    `;
}

function profilePage() {
    const user = users[currentRole];

    return `
        <div class="profile-layout">

            <div class="profile-card">
                <div class="profile-avatar">${user.initials}</div>
                <h3>${user.name}</h3>
                <p>${user.role}</p>
            </div>

            <div class="page-card">
                <h3>Personal Information</h3>
                <p>Your account information.</p>

                <div class="info-list" style="margin-top:20px;">

                    <div class="info-item">
                        <span>Full Name</span>
                        <strong>${user.name}</strong>
                    </div>

                    <div class="info-item">
                        <span>Email Address</span>
                        <strong>${user.email}</strong>
                    </div>

                    <div class="info-item">
                        <span>Account Type</span>
                        <strong>${user.role}</strong>
                    </div>

                </div>
            </div>

        </div>
    `;
}

function settingsPage() {
    return `
        <div class="page-card">
            <h3>System Settings</h3>
            <p>Manage basic clinic system preferences.</p>

            <div class="form-grid">

                <div class="input-field">
                    <label>Clinic Name</label>
                    <input type="text" value="Meija-Domingo Dental Clinic">
                </div>

                <div class="input-field">
                    <label>Clinic Contact</label>
                    <input type="text" value="0912 345 6789">
                </div>

                <div class="input-field">
                    <label>Clinic Email</label>
                    <input type="email" value="clinic@clinick.com">
                </div>

                <div class="input-field">
                    <label>Clinic Hours</label>
                    <input type="text" value="8:00 AM - 5:00 PM">
                </div>

                <div class="full-field">
                    <button class="primary-button" onclick="demoMessage('Settings saved successfully.')">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    `;
}

function demoSubmit(event) {
    event.preventDefault();
    alert("Appointment submitted successfully. This is a prototype.");
}

function demoMessage(message) {
    alert(message);
}

document.addEventListener("DOMContentLoaded", () => {
    updateDate();
});