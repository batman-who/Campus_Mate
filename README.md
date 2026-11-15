# Campus Mate 🎓🏫

**Live Demo:** [campusmate-five.vercel.app](https://vercel.app)

## 📌 Purpose
Campus Mate is a web application built by first-year B.Tech Computer Science and Engineering students to help college students across India quickly locate **empty classrooms, study rooms, and campus canteens**. 
On large university campuses, students often waste valuable break time searching for quiet study spaces or checking canteen availability. Campus Mate solves this everyday problem through a clean, accessible web interface.

---

## 🛠️ Tech Stack & Tools Used
* **Frontend Structure:** HTML5 (`index.html`, `homepage.html`, `main.html`, `login.html`, `canteen.html`, `survey.html`)
* **Styling & Themes:** CSS3 (`style.css`, `style1.css`, `home.css`, `project.css`, `newtheme.css`)
* **Client-Side Logic:** JavaScript (`jsfiles/`)
* **Version Control & Hosting:** Git, GitHub, and Vercel

---

## 📂 Project Structure
```text
Campus_Mate/
├── jsfiles/           # JavaScript scripts for interactivity and navigation
├── index.html         # Entry / landing page
├── login.html         # Student login interface
├── homepage.html      # Main navigation dashboard
├── main.html          # Empty classroom & study room finder view
├── canteen.html       # Campus canteen availability & info page
├── survey.html        # Student feedback & campus data survey form
├── style.css          # Core stylesheet
├── style1.css         # Secondary component styles
├── home.css           # Dashboard & homepage layout styles
├── project.css        # Feature section styling
└── newtheme.css       # Custom color themes and UI enhancements
```

---

## ⚙️ Implementation & Key Features
* **Classroom & Study Space Discovery:** Dedicated views (`main.html`, `homepage.html`) allowing students to browse available study rooms and vacant classrooms.
* **Canteen Directory:** Quick-access canteen information page (`canteen.html`) to help students locate dining options on campus.
* **Student Survey & Feedback:** Interactive survey form (`survey.html`) to gather real-time student input and improve campus space accuracy.
* **User Authentication Interface:** Structured student login flow (`login.html`) designed with clean form validation and modular CSS theming.
* **Continuous Deployment:** Connected directly to **Vercel** for automatic live builds whenever updates are pushed to the `main` branch.

---

## 🚀 How to Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com
   ```
2. **Navigate to the project folder:**
   ```bash
   cd Campus_Mate
   ```
3. **Launch the application:**
   Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox) or run it using the **Live Server** extension in VS Code.

---

## ✅ Outcome & Future Roadmap
* **Current Outcome:** Successfully built and deployed a multi-page, responsive campus utility web app accessible live at [campusmate-five.vercel.app](https://vercel.app).
* **Planned Enhancements (DevSecOps & Backend):**
  * Integrate a secure backend API with role-based authentication and encrypted student sessions.
  * Add automated GitHub Actions CI/CD security checks (HTML/JS linting and dependency vulnerability scanning) before Vercel deployment.
  * Implement real-time classroom occupancy status updates.

---

## 🔒 Security Note
This repository contains no hardcoded API keys, passwords, or sensitive personal credentials. All future backend integrations will use environment variables (`.env`) excluded via `.gitignore`.
