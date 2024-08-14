# Duck Proxy Search Engine

Duck Proxy is a simple search engine proxy built using Next.js, designed to interface with the DuckDuckGo API. This project provides a seamless way to search the web while preserving user privacy, offering a user interface with search history functionality.

## Features

- **Search Functionality**: Perform searches using the DuckDuckGo API.
- **Search History**: Stores search queries with timestamps for easy reference.

## Technical Details

- **Custom Highlighter Component**: I developed a custom highlighter component instead of using a standard library to showcase my technical expertise.
- **Next.js**: I chose Next.js to leverage its Node.js backend and React frontend capabilities, as the project requirements indicate that resource usage would be minimal since it functions as a proxy. In a real-world business environment, I would avoid using Next.js's backend for business logic due to scalability concerns.
- **Duck-Duck-Scrape Library**: I used the `duck-duck-scrape` library to fetch and parse DuckDuckGo search results via HTML instead of JSON, which allows for more results to be returned rather than just one.
- **Redux Toolkit**: I utilized Redux Toolkit to manage the global state for query history. The query history is a component integrated within the `<Header>`, while the action to save the history is handled within the component that displays the results. Additionally, Redux loads the query history from Local Storage.
- **Factory and Interfaces**: I employed factory patterns and interfaces to abstract the DuckDuckGo API, making it easy to switch to another API by simply implementing the `ApiProxy` interface.
- **Pagination**: A fixed number of pages is provided because the DuckDuckGoAPI does not return the total number of records.


## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:vitoraderaldo/duck-proxy.git
   cd duck-proxy
   ```

2. Install the dependencies:
  ```bash
  npm install
  ```

3. Run the server:
  ```bash
  npm run build
  npm run start
  ```
4. Open your browser and navigate to http://localhost:3000

## Running Tests

To run the end-to-end (e2e) tests, follow these steps:

1. **Start the Application**: Ensure the application is running. You can start the app by executing:
   ```bash
   npm run start
   ```
1. **Run the E2E**: With the application running, open a new terminal window and execute the following command:
   ```bash
   npm run test:e2e
   ```
