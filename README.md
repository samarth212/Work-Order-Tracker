# Work Order Tracker

A simple full-stack work order tracking app built with Angular, ASP.NET Core, EF Core, and SQL Server.

The app lets users create, view, edit, and delete work orders. It also tracks important status changes in an activity history and supports an internal comment thread on each work order.

## Tech Stack

- Frontend: Angular 21
- Backend: ASP.NET Core Web API
- Database: SQL Server
- ORM: Entity Framework Core

## Features

- Dashboard with all work orders
- Create new work orders
- View one work order by direct URL
- Edit and delete work orders
- Status workflow:
  - Open
  - Assigned
  - In Progress
  - Waiting on Parts
  - Completed
  - Closed
- Activity history for status, priority, and assignee changes
- Comment thread for internal work order updates

## Project Structure

```text
work-order-tracker/
  backend/     ASP.NET Core API and EF Core models
  frontend/    Angular app
```

## Frontend Routes

```text
/dashboard        Main dashboard and work order list
/workorders/new   Create work order form
/workorders/:id   Work order detail page
```

## Backend API

Backend runs on:

```text
http://localhost:5056
```

Work order endpoints:

```text
GET    /workorders
GET    /workorders/{id}
POST   /workorders
PUT    /workorders/{id}
DELETE /workorders/{id}
```

Activity history endpoint:

```text
GET /workorders/{id}/activities
```

Comment endpoints:

```text
GET  /workorders/{id}/comments
POST /workorders/{id}/comments
```

## Prerequisites

- .NET SDK 10
- Node.js and npm
- Docker Desktop
- EF Core CLI

Install the EF Core CLI if needed:

```bash
dotnet tool install --global dotnet-ef
```

## Database Setup

Create a Docker volume:

```bash
docker volume create workorder_sql_data
```

Run SQL Server:

```bash
docker run \
  --platform linux/amd64 \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=YourStrong!Passw0rd" \
  -p 1433:1433 \
  --name workorder-sql \
  -v workorder_sql_data:/var/opt/mssql \
  -d \
  mcr.microsoft.com/mssql/server:2022-latest
```

Set the backend connection string with user secrets:

```bash
cd backend
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=WorkOrderTracker;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True;"
```

Apply migrations:

```bash
dotnet ef database update
```

## Run the App

Start the backend:

```bash
cd backend
dotnet run
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm start
```

Open:

```text
http://localhost:4200/dashboard
```

Direct work order links should also work:

```text
http://localhost:4200/workorders/1
```


