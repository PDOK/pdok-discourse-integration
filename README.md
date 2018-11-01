# PDOK Discourse Integration

Renders a list of the 4 latest updated Discourse topics.

## Prerequisites

The following tools are required:

* [Node.js v8 or higher](https://nodejs.org/en/)

## Installation

These webcomponents can be installed using NPM:

```bash
npm install --save @pdok/pdok-discourse-integration
```

## Usage with React

Here is an example of using webcomponents within a React application:

```jsx
import React from 'react';
import { Topics } from '..';

const uri = 'https://forum.pdok.nl/c/datasets/bag.json';

export default () => (
  <Topics uri={uri}/>
);
