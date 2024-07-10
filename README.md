# React on Rails Application for Creating Posts

This is a simple application built with Rails 7 and React 18, using Vite for managing the React scaffold. The application allows users to create, view, and manage posts.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow the instructions below to set up and run the application on your local machine.

## Prerequisites

Ensure you have the following installed on your machine:

- Ruby 3.0+
- Rails 7.0+
- Node.js 14+
- npm 6+

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/antonioricardojr/video.git
    cd react-on-rails-posts-app
    ```

2. **Install Rails dependencies:**
    ```sh
    bundle install
    ```

3. **Set up the database:**
    ```sh
    rails db:create
    rails db:migrate
    ```

4. **Install JavaScript dependencies:**
    ```sh
    npm install
    ```

5. **Generate the Vite React scaffold:**
    ```sh
    bundle exec rails generate react:install --vite
    ```

## Running the Application

1. **Start the Rails server:**
    ```sh
    rails server
    ```

2. **Start the Vite development server:**
    ```sh
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Features

- **Create Posts:** Users can create new posts.
- **View Posts:** Users can view a list of all posts.
- **Edit Posts:** Users can edit existing posts.
- **Delete Posts:** Users can delete posts.


## References

This app is part of a playlist you can find here: https://youtu.be/nKybfmmO7JU?si=Z_OZDk91lQv1YdVH
