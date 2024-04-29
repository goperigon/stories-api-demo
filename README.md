# Perigon Stories App

This repository is for providing a simple Demo React app built using the Perigon API for Displaying Latest Stories about **Electrical Vehicles** and the ability to view the story timeline and verify with the help of _contextual intelligence_

## Setup

The app uses [vite](https://vitejs.dev/) to make it easy for anyone to clone the repo and start the project.

To start the project development server, you can use the **dev** script:

for **pnpm**:

```bash
pnpm run dev
```

If you prefer **npm**:

```bash
npm run dev
```

## Usage

The first thing you will see when you go to the main webpage of the app, is an input to insert your Perigon API key. You can find your API Key in your [Dashsboard](https://www.goperigon.com/account/api-key).

> You can create a Perigon account and get a free access to the API through the [sign-up](https://www.goperigon.com/sign-up) page.

Once you insert your _valid_ **API key** you will get all recent stories about **Electrical Vehicles** fetched using the Perigon [`/stories`](https://docs.goperigon.com/docs/story-data) endpoint.

Here's a screenshot of the app

![alt text](assets/image.png)

## License

the project is under the [MIT](/LICENSE) license
