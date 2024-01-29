
# Getting Started with TaskManagement

Welcome to your new project! This guide will walk you through the steps to set up and run your project locally. The project consists of a frontend built with vanilla JavaScript, HTML, and Tailwind CSS, and a backend that needs to be run separately. Here's how you can get started:

## Setting Up the Frontend

To view and interact with your frontend application, you'll need to serve it using a local server. There are several ways to do this:

### Option 1: Using Visual Studio Code with Live Server Extension
1. Open your project in Visual Studio Code (VSCode).
2. Ensure you have the 'Live Server' extension installed. If not, you can install it from the VSCode marketplace. This extension is developed by Ritwick Dey.
3. Once installed, right-click the `index.html` file in your project.
4. Select 'Open with Live Server' from the context menu. You can also use the shortcut `Alt+L Alt+O`.
5. Your default web browser should automatically open and display your frontend application.

### Option 2: Using a Local Server like XAMPP or WAMP
1. Install XAMPP or WAMP on your computer if you haven't already.
2. Copy your project files into the 'htdocs' directory (for XAMPP) or 'www' directory (for WAMP).
3. Start the XAMPP or WAMP server and ensure the Apache module is running.
4. Open your web browser and navigate to `http://localhost/your_project_folder` to view your project.


## Running the Backend Server with SQL Server and Entity Framework Core

To ensure the full functionality of your frontend application, it is crucial to have the backend server running. This project utilizes Microsoft SQL Server (SQLEXPRESS) and is developed using .NET 6 with Entity Framework Core. Here's how to set up and run your backend server:

### Prerequisites
- .NET 6 SDK installed on your machine.
- Microsoft SQL Server (SQLEXPRESS) installed and running.
- A database named `TaskManagmentDB` should exist on your SQL Server instance. Create it manually using SQL Server Management Studio or another database management tool if it's not already there.

### Steps to Run the Backend Server

1. **Open a Command Prompt or Terminal**:
   - Navigate to the backend directory of your project where the `.csproj` file is located.

2. **Configure the Connection String**:
   - Open the `appsettings.json` file.
   - Ensure the `ConnectionStrings` section is correctly set:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=ComputerName\\SQLEXPRESS;Database=TaskManagmentDB;Trusted_Connection=True;"
     }
     ```
   - Replace `ComputerName` with the name of your computer or the server where SQL Server is running.

3. **Create and Apply Migrations**:
   - In the same directory as the `.csproj` file, execute the following command to create a new migration (if you haven't already):
     ```
     dotnet ef migrations add InitialCreate
     ```
     Replace `InitialCreate` with a name that describes the migration.
   - Apply the migrations to update the `TaskManagmentDB` database:
     ```
     dotnet ef database update
     ```

4. **Run the Backend Server**:
   - Execute the command below to start the server:
     ```
     dotnet run
     ```

After completing these steps, your backend server will be up and running. Both the frontend and backend servers must be operational for the complete functionality of your project. Enjoy developing your application!

Once you have completed these steps, your backend server will be operational, and you can start using your frontend application. Remember to keep both the frontend and backend servers running for the full functionality of your project. Happy coding!

Link for the Backend Repository: https://github.com/FlorentZani/TaskManagment-Backend

Link for the Frontend Repository: https://github.com/FlorentZani/TaskManagement-Frontend
