
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

For the frontend application to function correctly, you need to have the backend server running. This project uses Microsoft SQL Server (SQLEXPRESS) and .NET 6 with Entity Framework Core. Follow these steps to set up and run your backend server:

### Prerequisites
- Ensure you have .NET 6 SDK installed on your machine.
- Have Microsoft SQL Server (SQLEXPRESS) installed and running.
- A database named `TaskManagmentDB` should exist in your SQL Server instance. If it doesn't and also the commands dosen't create it manually, create it manually using SQL Server Management Studio or another database management tool.

### Steps to Run the Backend Server

1. **Open a Command Prompt or Terminal**:
   - Navigate to the backend directory of your project where the `.csproj` file is located.

2. **Configure the Connection String**:
   - Open the `appsettings.json` file in your project.
   - Verify the `ConnectionStrings` section is correctly configured:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=ComputerName\\SQLEXPRESS;Database=TaskManagmentDB;Trusted_Connection=True;"
     }
     ```
   - Replace `ComputerName` with your computer's name or the server where SQL Server is running.

3. **Migrate and Update the Database Using Entity Framework Core**:
   - Ensure you are in the directory containing the `.csproj` file.
   - Execute the following command to apply migrations to the `TaskManagmentDB` database:
     ```
     dotnet ef database update
     ```
     This command will create or update the database schema based on your Entity Framework migrations.

4. **Run the Backend Server**:
   - Execute the following command to run the backend server:
     ```
     dotnet run
     ```
     This will start the server and host your backend application.

Once you have completed these steps, your backend server will be operational, and you can start using your frontend application. Remember to keep both the frontend and backend servers running for the full functionality of your project. Happy coding!

Link for the Backend Repository: https://github.com/FlorentZani/TaskManagment-Backend

Link for the Frontend Repository: https://github.com/FlorentZani/TaskManagement-Frontend
