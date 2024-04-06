# Weather Watch
Acceda al aplicativo en entorno de desarrollo `https://weather-watch-delta.vercel.app/login`


## Frontend Application

The Weather Watch API collection is complemented by a frontend application designed to provide users with an intuitive interface for interacting with the API's functionalities. This section outlines the key features and setup instructions for the frontend application.



### Features

- **User Management:** Allows administrators to list, add, remove, and view users through a user-friendly dashboard.
- **Weather Data Visualization:** Offers a graphical representation of weather data fetched from the API, including temperature trends, precipitation, and other relevant metrics.
- **Authentication:** Supports login and registration functionalities, ensuring secure access to the application.

### Setup and Installation

1. **Clone the Repository:** Start by cloning the frontend repository to your local machine.
   ```
   git clone https://github.com/juanse1080/weather-watch.git
   ```

2. **Install Dependencies:** Navigate to the cloned directory and install the necessary dependencies.
   ```
   cd weather-watch
   yarn
   ```

3. **Configuration:** Create the `.env.local` file with the API's base URL and any other required configurations.
   ```
    DATABASE_URL=mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>
    SECRET_KEY=<SECRET_KEY>
    EXPIRED_TOKEN=<EXPIRED_TOKEN>
    WEATHER_BASE_URL=<WEATHER_BASE_URL>
    WEATHER_USER_NAME=<WEATHER_USER_NAME>
    WEATHER_PASSWORD=<WEATHER_PASSWORD>
    NEXT_PUBLIC_API_BASE_URL=<NEXT_PUBLIC_API_BASE_URL>
   ```

4. **Run the Application:** Start the application by running the following command. It will be accessible on `http://localhost:3000`.
   ```
   yarn dev
   ```
   
## Weather Watch API Collection

This collection is designed for managing users, roles, and fetching weather data. It is structured for use with Postman, a popular tool for API testing and development.

### Collection Info

- **ID:** 275e4d7b-c1fc-411d-b311-0efdaefb2466
- **Name:** weather-watch
- **Schema Version:** 2.1.0

### Authentication

This collection uses Bearer Token authentication for securing endpoints. Ensure you have a valid token before making requests.

### Endpoints

#### Users

- **List Users**
  - **Method:** GET
  - **URL:** `{{baseUrl}}/users?page=0&per_page=10`
  - Lists users with pagination.

- **Remove User**
  - **Method:** DELETE
  - **URL:** `{{baseUrl}}/users/:id`
  - Removes a user by ID.

- **Show User**
  - **Method:** GET
  - **URL:** `{{baseUrl}}/users/:id`
  - Shows details of a specific user by ID.

#### Roles

- **List Roles**
  - **Method:** GET
  - **URL:** `{{baseUrl}}/roles`
  - Lists roles. Pagination parameters are available but disabled by default.

- **Show Role**
  - **Method:** GET
  - **URL:** `{{baseUrl}}/roles/:roleId`
  - Shows details of a specific role by ID.

- **Remove Role**
  - **Method:** DELETE
  - **URL:** `{{baseUrl}}/roles/:id`
  - Removes a role by ID.

#### Weather

- **Get Weather**
  - **Method:** GET
  - **URL:** `{{baseUrl}}/weather?start_date=2024-04-05T00:00:00Z&interval=PT12H&end_date=2024-04-05T12:00:00Z&location=52.520551,13.461804&parameters=t_mean_2m_12h:F`
  - Fetches weather data based on the specified parameters.

#### Register

- **Register User**
  - **Method:** POST
  - **URL:** `{{baseUrl}}/register`
  - Registers a new user. The request body should include name, email, password, and confirmPassword fields.

#### Login

- **Login User**
  - **Method:** POST
  - **URL:** `{{baseUrl}}/login`
  - Authenticates a user. The request body should include email and password fields.

### Events

This collection includes placeholders for pre-request and test scripts, allowing you to add custom logic before requests are sent or after responses are received.

### Usage

To use this collection, import it into Postman. You may need to customize the `{{baseUrl}}` variable to match your API's URL and update the authentication token as necessary.

### Contributing

Contributions to this collection are welcome. Please ensure you follow the project's contribution guidelines and code of conduct.

## Frontend Application

The Weather Watch API collection is complemented by a frontend application designed to provide users with an intuitive interface for interacting with the API's functionalities. This section outlines the key features and setup instructions for the frontend application.

### Features

- **User Management:** Allows administrators to list, add, remove, and view users through a user-friendly dashboard.
- **Weather Data Visualization:** Offers a graphical representation of weather data fetched from the API, including temperature trends, precipitation, and other relevant metrics.
- **Authentication:** Supports login and registration functionalities, ensuring secure access to the application.

### Setup and Installation

1. **Clone the Repository:** Start by cloning the frontend repository to your local machine.
   ```
   git clone https://github.com/juanse1080/weather-watch.git
   ```

2. **Install Dependencies:** Navigate to the cloned directory and install the necessary dependencies.
   ```
   cd weather-watch
   yarn
   ```

3. **Configuration:** Create the `.env.local` file with the API's base URL and any other required configurations.
   ```
    DATABASE_URL=mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>
    SECRET_KEY=<SECRET_KEY>
    EXPIRED_TOKEN=<EXPIRED_TOKEN>
    WEATHER_BASE_URL=<WEATHER_BASE_URL>
    WEATHER_USER_NAME=<WEATHER_USER_NAME>
    WEATHER_PASSWORD=<WEATHER_PASSWORD>
    NEXT_PUBLIC_API_BASE_URL=<NEXT_PUBLIC_API_BASE_URL>
   ```

4. **Run the Application:** Start the application by running the following command. It will be accessible on `http://localhost:3000`.
   ```
   yarn dev
   ```