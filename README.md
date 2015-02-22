# Forky Client

**Forky** is an app for realtime collaborative mind-mapping. You can use it on [forky.io](http://forky.io).

The Forky Client is the front-end of forky. It should be used with a [Forky Server](http://github.com/21cdawn/forky-server). You can check out the full guide for deploying forky (here)[http://github.com/21cdawn/forky]. This Readme covers details specific to the client.


## Overview

Forky is a single-page application, built with React. It communicates using both websockets and ajax, and dynamically renders the resulting elements. Websockets transport realtime data, primarily chats and graph edits. AJAX is used for user authentication, and listing the maps. Realtime collaboration is built on ShareJS, but I would like to move away from ShareJS, as it is not well written or documented.


## Building Forky Client

Get git and nodejs installed if you don't have them.

```bash

 $ git clone https://github.com/21cdawn/forky-client

 # install the node dependencies
 $ cd forky-client
 $ npm install


 # build the client
 $ gulp build    # builds into 'dist' folder by default


```


## Development

*Placeholder for Development Instructions*