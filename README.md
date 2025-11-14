# KodeKalesh-2025
# EduSmart Student AI Platform

## Problem Statement

Students and educators need a one-stop platform where they can quickly query any topic, access AI-powered answers, make instant notes, practice coding, generate MCQs, and discover related YouTube resources—all with an attractive responsive UI.

---

## Solution Overview

**EduSmart Student AI Platform** provides:

- An animated, modern ChatGPT-like assistant for any query (study, code, general)
- Options to save AI answers as PDF, listen via voice, and practice MCQs
- Modal-based student notes app, with local storage for private note-taking
- A multi-language compiler launcher for CS students (Python, Java, C/C++, JS, more)
- One-click YouTube topic search
- Fully responsive, visually rich design for web and mobile
- Simple integration and AWS static deployment

---

## Stack Used

- HTML5 + CSS3 + JavaScript (no framework for front-end)
- [jsPDF](https://github.com/parallax/jsPDF) for PDF export ([MIT License](https://github.com/parallax/jsPDF/blob/master/LICENSE))
- [OneCompiler](https://onecompiler.com/) and [Programiz](https://www.programiz.com/python-programming/online-compiler/) as external compiler resources  
- [AWS Builder / Amplify (S3 static hosting)](https://aws.amazon.com/amplify/)

---

## How To Run Locally

1. Clone/download this repo.
2. Open the folder in **VS Code**.
3. Install **Live Server** extension.
4. Right-click `index.html` → select **Open With Live Server**.
5. The site launches in your browser. Try all header/menu options and AI chat features!

---

## How To Deploy on AWS

1. Log into your **AWS Builder** workspace.
2. Choose "Create Project" → select Static Web Hosting.
3. Upload all files (`index.html`, `style.css`, `script.js`).
4. Deploy. AWS gives you a public URL to share.

---

## Features

- **AI Chat Assistant:** Ask anything, AI answers in real time (demo uses a simulated backend).
- **PDF Download:** Save your answer as a beautiful PDF with one click.
- **Text to Speech:** Listen to any answer using the browser's speech API.
- **MCQ Generator:** Auto-generate multiple-choice questions based on your query.
- **Notes App:** Type, save, view, and delete your study notes.
- **Online Compiler:** Pick any programming language and open the best online compiler.
- **YouTube Search:** Instantly find the best YouTube videos related to your study topic.

---

## How to Contribute

- Fork this repo, create a branch, send a Pull Request.
- Open issues for bugs or feature requests.

---

## Credits / Libraries Used

- [jsPDF](https://github.com/parallax/jsPDF) - Used for PDF export.
- [OneCompiler](https://onecompiler.com/) - External multi-language code compiler.
- [Programiz Python Compiler](https://www.programiz.com/python-programming/online-compiler/) - Embedded/linked as needed.
- [Stack Overflow](https://stackoverflow.com/) - Referenced for some vanilla JS and LocalStorage patterns.
- UI/UX inspired by ChatGPT, TopMediaAI, and modern hackathon student dashboards.

---

## License

This project is open source and free for educational use.
