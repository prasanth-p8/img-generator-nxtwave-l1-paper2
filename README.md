# Img Generator

Img Generator is a React application that allows users to search for images using the Unsplash API. Users can enter search terms or select from suggested search terms button to view images related to their query.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## Demo

Check out the live demo of the application: [Live Demo](https://prasanthimggenerator.vercel.app)

## Features

- **Search for Images:** Enter a search term to find related images using the Unsplash API.
- **Suggested Searches:** Click on predefined suggested search buttons for quick results.
- **Loading Indicator:** Displays a loading indicator while the API request is in progress.
- **Error Handling:** Shows an error message if the API request fails or if no images are found.
- **Image Description:** Hover at the each image to know the description of that image.

## Tech Stack

- React
- Hooks
- Unsplash API
- CSS for styling

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prasanth-p8/img-generator-nxtwave-l1-paper2
   ```

2. Navigate to the project directory:

   ```bash
   cd img-generator-nxtwave-l1-paper2-main
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000.

## Usage

1. Open the application in your browser.
2. Enter a search term in the search input field and press Enter or click the search button.
3. Alternatively, click one of the suggested search buttons to search for a predefined term.
4. View the search results displayed on the page.
5. Hover at the image to see the image discription.

## API Reference

The application uses the Unsplash API to fetch images. You need to have an Unsplash API key to use this application.

- **Login:** Open your unsplash account, using https://unsplash.com/developers
- **API Key:** Get your API key from your created applicaiton.
- **Endpoint:** https://api.unsplash.com/search/photos
- **Query Parameters:**
  - _page:_ The page number to retrieve.
  - _client_id:_ Your Unsplash API key.
  - _query:_ The search value.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.
