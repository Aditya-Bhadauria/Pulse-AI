# Pulse-AI

Pulse-AI is an AI-powered assistant application built using **Spring Boot**, **Gemini API**, and a **React frontend**. The system enables continuous, context-aware verbal conversations between users and the AI agent. The application also supports personality customization, allowing developers to easily configure the AI’s response style and behavior through system prompts.

---

## Application Screenshots

| Preview | Description |
|:-----------|:-------------|
| <img src="https://github.com/user-attachments/assets/af0e11df-82b6-48f6-817c-d2cb344d3d0b" alt="AI Agent Interface" width="300"/> | **AI Agent Verbal Conversation Interface** — This screen shows the AI agent interacting with users through continuous voice conversations. |
| <img src="https://github.com/user-attachments/assets/861a78d2-d396-4939-a4ea-1a3f1ca17e29" alt="React Frontend Listening State" width="300"/> | **Listening State (Frontend UI)** — The AI enters an active listening state, indicated by a pulsing animation, where it captures and understands the user’s spoken input in real time. |
| <img src="https://github.com/user-attachments/assets/5bd7cb58-2d9f-4807-a39d-3b2cfd2a7514" alt="Backend Output State" width="300"/> | **Output State (Backend Response Logging)** — After processing the input, the AI responds verbally in a natural, human-like manner.|

---

## Features

- **Conversational AI**: Continuous verbal conversations via voice input and AI-generated responses.
- **Context Awareness**: Session-based memory to maintain conversation flow within sessions.
- **Personality Customization**: Configurable AI personality through system prompt management.
- **Secure and Modular Backend**: Built with Spring Boot for robust, scalable APIs.
- **Gemini AI API Integration**: Natural language understanding and generation.
- **Modern React Frontend**: Responsive UI with real-time listening and response states.
- **Session Management**: Dynamic, stateful conversations and memory handling.
- **Text-to-Speech**: Google Cloud Text-to-Speech for voice responses.

---

## Tech Stack

**Backend**

- Java 17+ 
- Spring Boot (Web, Webflux)
- Gemini AI API
- Google Cloud Text-to-Speech
- REST APIs / WebSockets
- Maven

**Frontend**

- React 18
- Vite
- TailwindCSS
- Radix UI
- Axios or Fetch for API communication

---

## Getting Started

### Prerequisites

- Java 17+ (for backend)
- Node.js (for frontend)
- Google Cloud Text-to-Speech API credentials
- **Google Gemini API key** (See Important Note below)

### Clone the Repository

```bash
git clone https://github.com/Aditya-Bhadauria/Pulse-AI.git
cd Pulse-AI
```

---

### Backend Setup (Spring Boot)

```bash
cd Backend
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

- Edit `application.properties` for API keys or environment configs (e.g., Google Cloud credentials).

---

### Frontend Setup (React + Vite)

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will typically be running at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
Pulse-AI/
├── Backend/      # Spring Boot backend
│   └── pom.xml
├── Frontend/     # React frontend
│   └── package.json
```

---

## Customization & Extensibility

- **AI Integrations**: Easily swap or extend the AI backend using Spring AI.
- **UI Components**: Built with Radix UI and Tailwind for rapid UI changes.

---

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

---

## Important Note

To run this project successfully, you must have a valid **Google Gemini API key** and associated credentials.  
You can obtain them by signing up for the Google AI Developer program and enabling the Gemini API for your project in the Google Cloud Console.

---

## Contact

Maintained by [Aditya Bhadauria](https://github.com/Aditya-Bhadauria).

---

## Links

- [GitHub Repository](https://github.com/Aditya-Bhadauria/Pulse-AI)


