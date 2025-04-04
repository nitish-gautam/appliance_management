# Appliance Management System

## 🎯 Objective

The **Appliance Management System** is a comprehensive platform designed to manage properties and their appliances efficiently. It allows users to view appliance details, manage replacement options, and schedule replacements through a user-friendly interface.

This system primarily focuses on the following data:

- **Property**: Details of the property including name, address, and shipping label.
- **Appliance**: Appliance information, including brand, model number, usage, and image.
- **Replacement Option**: Suggested appliance replacements with details such as brand, model, price, efficiency, and matching score.
- **Order**: Tracks scheduled replacements with date, time, and notes.

## 🛠️ Implemented Features

- **Property and Appliance Management**:
  - Ability to view property and appliance details including images and usage.
  - Display recommended appliance replacements based on efficiency and model.

- **Order Scheduling and Management**:
  - Schedule replacement orders with specific dates and times.
  - Capture additional instructions for installation or delivery.
  - Order confirmation with visual feedback.

- **Interactive Front-End**:
  - Responsive interface using React.js with detailed views and dynamic updates.
  - Interactive modals for scheduling and ordering appliances.

- **Backend API**:
  - RESTful API built with Django REST Framework.
  - Endpoints to manage properties, appliances, replacements, and orders.
  - Admin panel to manage data and perform CRUD operations.

- **Dockerized Deployment**:
  - Runs seamlessly in Docker containers using Docker Compose.
  - Integrated with NGINX for serving static and media files.

---

## 🚀 Getting Started

### Prerequisites

- **Python:** 3.10 or higher
- **Node.js:** 18.x or higher
- **Django:** As specified in `requirements.txt`
- **SQLite:** Default database used
- **Docker:** For containerized deployment

### Setting Up the Project

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd appliance_management
   python -m venv venv
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r backend/requirements.txt
   npm install --prefix frontend
   ```

3. **Run Migrations:**

   ```bash
   python backend/manage.py makemigrations
   python backend/manage.py migrate
   ```

4. **Create a Superuser:**

   ```bash
   python backend/manage.py createsuperuser
   ```

5. **Run the Application Locally:**

   ```bash
   python backend/manage.py runserver
   npm start --prefix frontend
   ```

**Access the Application:**

- **Django Admin Interface:** http://localhost:8000/admin/
- **Frontend Application:** http://localhost:3000/

---

### Using Docker

#### Build and Run the Docker Containers:

```bash
docker-compose up --build
```

#### Access the Application:

- **Frontend:** http://localhost/
- **Admin Panel:** http://localhost/admin/
- **Media Files:**
  - Appliance Images: http://localhost/media/appliance_images/
  - Shipping Labels: http://localhost/media/shipping_labels/

#### Docker Commands:

- **Restart Services:**

  ```bash
  docker-compose restart
  ```

- **Stop Containers:**

  ```bash
  docker-compose down
  ```

- **View Logs:**

  ```bash
  docker-compose logs -f
  ```

- **Rebuild and Restarts:**

  ```bash
  # Rebuild and start the containers.
  docker-compose down --volumes --remove-orphans
  docker-compose up -d --build
  ```

- **Check Logs**

  ```bash
  # Check the logs to ensure that Gunicorn is running correctly:
  docker-compose logs backend
  docker-compose logs nginx
---



## 📂 Testing and Pytest

- **Running Tests**

  ```bash
  # To run the test suite, use the following command:
  pytest tests/ -v

  # Test log
  platform darwin -- Python 3.13.2, pytest-8.3.5, pluggy-1.5.0
  cachedir: .pytest_cache
  django: version: 5.2, settings: appliance_management.settings (from env)
  rootdir: /Users/nitishgautam/Code/test/appliance_management
  plugins: django-4.11.1collected 6 items
  

  tests/test_api.py::test_property_list     PASSED  [ 16%]
  tests/test_api.py::test_appliance_list    PASSED  [ 33%]
  tests/test_api.py::test_replacement_list  PASSED  [ 50%]
  tests/test_api.py::test_create_order      PASSED  [ 66%]
  tests/test_api.py::test_order_list        PASSED  [ 83%]
  tests/test_api.py::test_order_detail      PASSED  [100%]
  =============== 6 passed in 0.12s=======================

- **Test Coverage**
    - Property Management
    - Appliance Management
    - Replacement Management
    - Order Management
---

## 📂 Project Structure

- **backend/**: Django REST framework application.
- **frontend/**: React.js application.
- **nginx/**: Configuration files for NGINX.
- **docker-compose.yml**: Configuration for multi-container setup.

---

## 📝 Troubleshooting

- If the frontend is not loading:
  - Check if the **REACT_APP_API_URL** is correctly set.
  - Restart the frontend container.

- If the admin page is inaccessible:
  - Ensure the **backend** container is running.

- Media files not displaying:
  - Ensure volume mappings are correctly set in `docker-compose.yml`.

---

## 📧 Support

For any issues or questions, please open an issue on the project’s GitHub repository.

---



