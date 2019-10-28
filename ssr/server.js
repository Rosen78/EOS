import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';
import fs from 'fs'

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>,
    ),
  );

  const css = sheets.toString();

  res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

app.get('/', (req, res) => res.render(handleRender(req, res)))

app.get('/tablesdata', (req, res) => {

    let tabNumber = req.query.tabnumber

    let rawdata = fs.readFileSync('./data/tablesData.json');
    let tablesData = JSON.parse(rawdata);

    return res.send(tablesData[tabNumber])

})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
