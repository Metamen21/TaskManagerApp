# ========================
# 1️⃣ Frontend Build Stage
# ========================
FROM node:20 AS frontend
WORKDIR /app

# Copy frontend project
COPY taskmanagerapp.client/ ./taskmanagerapp.client/

WORKDIR /app/taskmanagerapp.client
RUN npm install
RUN npm run build

# ========================
# 2️⃣ Backend Build Stage
# ========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj and restore
COPY TaskManagerApp.Server/TaskManagerApp.Server.csproj TaskManagerApp.Server/
RUN dotnet restore TaskManagerApp.Server/TaskManagerApp.Server.csproj

# Copy full source
COPY . .

# Copy frontend build output into wwwroot
RUN rm -rf TaskManagerApp.Server/wwwroot/*
COPY --from=frontend /app/taskmanagerapp.client/dist/ TaskManagerApp.Server/wwwroot/

# Remove dist folder entirely so MSBuild won't re-scan it
RUN rm -rf taskmanagerapp.client/dist

# Publish backend without re-building client and without static asset re-scan
WORKDIR /src/TaskManagerApp.Server
RUN dotnet publish TaskManagerApp.Server.csproj \
    -c $BUILD_CONFIGURATION \
    -o /app/publish \
    /p:UseAppHost=false \
    /p:BuildProjectReferences=false \
    /p:SkipStaticWebAssetCopyToOutput=true \
    /p:StaticWebAssetsEnabled=false

# ========================
# 3️⃣ Runtime Stage
# ========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=backend-build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "TaskManagerApp.Server.dll"]
