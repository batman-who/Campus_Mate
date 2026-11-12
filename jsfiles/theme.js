/* =========================================================
   CAMPUS MATE - Interactive JavaScript
   Beginner-friendly features using DOM, events and functions.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    setupThemeSwitcher();
    addPageAnimation();
    setupCanteenBooking();
    setupLoginForm();
    setupLoginSuccessNotice();
    setupTimetable();
});

function setupThemeSwitcher() {
    const controls = document.querySelector("nav > div");
    if (!controls) return;

    const themeButton = document.createElement("button");
    themeButton.type = "button";
    themeButton.className = "theme-toggle";
    themeButton.setAttribute("aria-pressed", "false");
    controls.appendChild(themeButton);

    function applyTheme(theme) {
        const isDark = theme === "dark";
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
        themeButton.textContent = isDark ? "Light theme" : "Dark theme";
        themeButton.setAttribute("aria-pressed", String(isDark));
    }

    const savedTheme = localStorage.getItem("campus-mate-theme");
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    themeButton.addEventListener("click", function () {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("campus-mate-theme", nextTheme);
        applyTheme(nextTheme);
    });
}

// Small entrance effect for the page content.
function addPageAnimation() {
    const main = document.querySelector("main");
    if (main) {
        main.classList.add("js-ready");
    }
}

// -------------------- CANTEEN PAGE --------------------
function setupCanteenBooking() {
    const form = document.querySelector(".card form");
    const foodSelect = document.getElementById("food");
    const drinkSelect = document.getElementById("beverage");

    // If these elements are not on this page, stop here.
    if (!form || !foodSelect || !drinkSelect) return;

    const prices = {
        "rajma-chawal": 80,
        "roti-sabji": 60,
        "masala-dosa": 90,
        "white-sauce-pasta": 110,
        "honey-chilli-potatoes": 100,
        "chai": 20,
        "hot-coffee": 40,
        "cold-coffee": 35,
        "cold-drink": 45,
        "fruit-juice": 50,
        "hot-chocolate": 55,
        "water-bottle": 20
    };

    // Add a quantity box and a live price preview using JavaScript.
    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity:";
    quantityLabel.htmlFor = "quantity";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = "quantity";
    quantityInput.min = "1";
    quantityInput.max = "10";
    quantityInput.value = "1";
    quantityInput.className = "js-control";

    const pricePreview = document.createElement("p");
    pricePreview.id = "price-preview";
    pricePreview.setAttribute("aria-live", "polite");
    pricePreview.className = "price-preview";

    form.insertBefore(quantityLabel, form.querySelector("button"));
    form.insertBefore(quantityInput, form.querySelector("button"));
    form.insertBefore(pricePreview, form.querySelector("button"));

    function updatePrice() {
        const foodPrice = prices[foodSelect.value] || 0;
        const drinkPrice = prices[drinkSelect.value] || 0;
        const quantity = Math.max(1, Math.min(10, Number(quantityInput.value) || 1));
        const total = (foodPrice + drinkPrice) * quantity;

        pricePreview.textContent = "Estimated total: ₹" + total;
    }

    foodSelect.addEventListener("change", updatePrice);
    drinkSelect.addEventListener("change", updatePrice);
    quantityInput.addEventListener("input", updatePrice);
    updatePrice();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const canteen = document.getElementById("canteen");
        const payment = document.getElementById("payment");

        if (!canteen || canteen.value === "Select Canteen" ||
            !foodSelect.value || foodSelect.value === "Select Food" ||
            !drinkSelect.value || drinkSelect.value === "Select Beverage" ||
            !payment || !payment.value) {
            showMessage(form, "Please select a canteen, food, beverage and payment method.", "error");
            return;
        }

        const foodName = foodSelect.options[foodSelect.selectedIndex].text;
        const drinkName = drinkSelect.options[drinkSelect.selectedIndex].text;
        const canteenName = canteen.options[canteen.selectedIndex].text;
        const paymentName = payment.options[payment.selectedIndex].text;
        const quantity = Math.max(1, Math.min(10, Number(quantityInput.value) || 1));
        const total = ((prices[foodSelect.value] || 0) +
            (prices[drinkSelect.value] || 0)) * quantity;

        showMessage(
            form,
            "Booking preview created! " + quantity + " × " + foodName +
            " with " + drinkName + " at " + canteenName +
            ". Estimated total: ₹" + total + ". Payment: " + paymentName +
            ". (Demo only — no real order or payment was made.)",
            "success"
        );
    });
}

// -------------------- LOGIN PAGE --------------------
function setupLoginForm() {
    const form = document.querySelector(".card form") ||
                 document.querySelector("main form");
    const password = document.getElementById("password");

    if (!form || !password) return;

    // Add a show/hide password button.
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.textContent = "Show password";
    toggleButton.className = "password-toggle";
    password.insertAdjacentElement("afterend", toggleButton);

    toggleButton.addEventListener("click", function () {
        if (password.type === "password") {
            password.type = "text";
            toggleButton.textContent = "Hide password";
        } else {
            password.type = "password";
            toggleButton.textContent = "Show password";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("reg");
        const university = document.getElementById("uni");

        if (!username || username.value.trim().length < 3 ||
            !university || !university.value ||
            password.value.length < 8) {
            showMessage(form, "Please complete all fields correctly. Password must have at least 8 characters.", "error");
            return;
        }

        sessionStorage.setItem("campus-mate-login-success", "true");
        window.location.href = "homepage.html";
    });
}

function setupLoginSuccessNotice() {
    if (sessionStorage.getItem("campus-mate-login-success") !== "true") return;

    sessionStorage.removeItem("campus-mate-login-success");

    const notice = document.createElement("div");
    notice.className = "login-success-toast";
    notice.textContent = "successfully logged in";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    document.body.appendChild(notice);

    window.setTimeout(function () {
        notice.remove();
    }, 8000);
}

// -------------------- TIMETABLE PAGE --------------------
function setupTimetable() {
    const table = document.querySelector("table");
    if (!table) return;

    const rows = Array.from(table.querySelectorAll("tr")).slice(1);
    if (rows.length === 0) return;

    // Create a simple search box above the timetable.
    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Search by day, block or room...";
    search.setAttribute("aria-label", "Search timetable");
    search.className = "js-search";

    table.parentElement.insertBefore(search, table);

    const resultText = document.createElement("p");
    resultText.style.fontWeight = "bold";
    table.parentElement.insertBefore(resultText, table);

    function filterRows() {
        const searchText = search.value.toLowerCase().trim();
        let visibleCount = 0;

        rows.forEach(function (row) {
            const matches = row.textContent.toLowerCase().includes(searchText);
            row.style.display = matches ? "" : "none";
            if (matches) visibleCount++;
        });

        resultText.textContent = visibleCount + " classroom option(s) found";
    }

    search.addEventListener("input", filterRows);

    filterRows();
}

// Reusable message box for form feedback.
function showMessage(form, message, type) {
    let messageBox = form.querySelector(".js-message");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.className = "js-message";
        messageBox.setAttribute("role", "status");
        messageBox.setAttribute("aria-live", "polite");
        form.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.classList.remove("success", "error");
    messageBox.classList.add(type);
}