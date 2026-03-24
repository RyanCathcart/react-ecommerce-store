FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy .csproj and restore as distinct layers
COPY "ReactECommerceStore.Api.csproj" ./
RUN dotnet restore

# Copy everything else, and build
COPY . ./
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 80

ENTRYPOINT [ "dotnet", "ReactECommerceStore.Api.dll" ]