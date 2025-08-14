# ========================
# 1️⃣ Frontend Build Stage
# ========================
#FROM node:20 AS frontend
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy and build frontend
COPY taskmanagerapp.client/ ./taskmanagerapp.client/
WORKDIR /app/taskmanagerapp.client
RUN npm install
RUN npm run build

# ========================
# 2️⃣ Backend Build Stage
# ========================
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS backend-build

ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy only backend csproj & restore
COPY TaskManagerApp.Server/TaskManagerApp.Server.csproj TaskManagerApp.Server/
RUN dotnet restore TaskManagerApp.Server/TaskManagerApp.Server.csproj

# Copy all backend code (excluding frontend)
COPY TaskManagerApp.Server/ TaskManagerApp.Server/

# Copy built frontend files into backend's wwwroot
RUN rm -rf TaskManagerApp.Server/wwwroot/*
COPY --from=frontend /app/taskmanagerapp.client/dist/ TaskManagerApp.Server/wwwroot/

# Publish backend (skip frontend build completely)
WORKDIR /src/TaskManagerApp.Server
RUN dotnet publish TaskManagerApp.Server.csproj \
    -c $BUILD_CONFIGURATION \
    -o /app/publish \
    /p:UseAppHost=false \
    /p:StaticWebAssetsEnabled=false \
    /p:SkipStaticWebAssetCopyToOutput=true \
    /p:DisableJavaScriptBuild=true

# ========================
# 3️⃣ Runtime Stage
# ========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=backend-build /app/publish .

