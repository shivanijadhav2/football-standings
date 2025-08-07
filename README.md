# Football Standings Microservice

This is a full-stack microservice solution to find the standings of a football team using a country name, league name, and team name. The project includes a backend API, a frontend UI, and a CI/CD pipeline, all containerized using Docker.

---

## 🚀 Getting Started

To run this project, you need to have **Docker** and **Docker Compose** installed on your system.

### Prerequisites

* **Docker:** [Installation Guide](https://docs.docker.com/get-docker/)
* **Docker Compose:** Included with Docker Desktop on Windows and macOS. For Linux, you may need to install it separately.

### Running the Application

1.  **Clone the Repository**
    ```bash
    git clone [your-repository-url]
    cd football-standings-project
    ```
2.  **Create `.env` File**
    In the root directory of the project, create a new file named **`.env`**. This file will store your API key.
    ```env
    API_FOOTBALL_KEY=your_api_key_here
    OFFLINE_MODE=false
    ```
    Replace `your_api_key_here` with your valid API key from `apifootball.com`.
3.  **Start the Services**
    The `start.sh` script handles building the Docker images and starting the containers.
    * **Linux / macOS:** Make the script executable and run it.
        ```bash
        chmod +x start.sh
        ./start.sh
        ```
    * **Windows:** Execute the script in a Bash-compatible terminal (like Git Bash or WSL).
        ```bash
        ./start.sh
        ```
4.  **Access the Application**
    Once the script finishes, the application will be running:
    * **Frontend UI:** `http://localhost`
    * **Backend API:** `http://localhost:8080`
    * **API Documentation (Swagger UI):** `http://localhost:8080/api-docs`

---

## 🛠️ Project Structure

The project is divided into two main services:

* **`backend/`**: A Node.js microservice built with Express.js that handles API requests, data fetching, and caching.
* **`frontend/`**: A React application that provides a user interface to interact with the backend service.

---

## 💡 Design & Implementation

### Architecture Overview

The application follows a standard microservice architecture where a frontend client communicates with a backend API. This backend service acts as a proxy to an external API (`apifootball.com`), with a crucial layer for caching and handling offline mode. Both services are containerized using Docker for portability.

### Design Principles

* **SOLID:** The backend service is structured to adhere to SOLID principles. For example, the `standingController` and `standingService` demonstrate the **Single Responsibility Principle (SRP)** by separating HTTP concerns from business logic.
* **12-Factor App:** The application is built to be a 12-Factor App. Configuration (like the API key and offline toggle) is managed via **environment variables**, and the services are **stateless**.
* **HATEOAS:** The backend API's response includes Hypermedia as a representation of the state of the application. The standing result contains links to related resources, allowing for dynamic API navigation.

### Patterns & Practices

* **Caching Strategy:** The backend implements an in-memory cache to store API responses. This is used to support an **offline mode**, where the service can return results even if the external API is unavailable.
* **Proxy Pattern:** The backend service acts as a proxy, abstracting the external API from the frontend. This decouples the client from the third-party service, making it more resilient.
* **Secure Configuration:** Sensitive information, like the API key, is not hardcoded but is managed through environment variables, ensuring security and production readiness.

---

## 📈 CI/CD Pipeline

The project includes a `Jenkinsfile` for a Continuous Integration and Continuous Deployment (CI/CD) pipeline.

* **`Jenkinsfile`**: Defines a pipeline that automates the build, test, and deployment process using Docker. It handles secure credentials and pushes the built images to a Docker registry.
* **Docker**: Each service has its own `Dockerfile` for containerization. `docker-compose.yml` is used to orchestrate both containers locally.

## 📝 API Documentation

The backend service's API is fully documented using the **OpenAPI Specification**. You can view the interactive documentation at:
`http://localhost:8080/api-docs`
