FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Copy .csproj and restore as distinct layers
COPY "ReactECommerceStore.sln" "ReactECommerceStore.sln"
COPY "ReactECommerceStore.Api/ReactECommerceStore.Api.csproj" "ReactECommerceStore.Api/ReactECommerceStore.Api.csproj"

RUN dotnet restore "ReactECommerceStore.sln"

# Copy everything else, and build

COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "ReactECommerceStore.Api.dll" ]