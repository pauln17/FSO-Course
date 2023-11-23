SPA or single page applications is a style of creating web applications that fetch one HTML page from the server and dynamically update the data in the page.

SPAs are primarily achieved through the use of JavaScript frameworks such as React, Angular, or Vue.js.

In the exercises, creating a new note without a single SPA application created a POST request to the server from the client, which sent back a redirect status code, causing the browser to send a GET request that refreshes the page. This leads to extra requests to the server on refresh.

However, with creating a new note in the SPA website, a status code of 201 is sent back instead, therefore there is no redirect and no extra requests.