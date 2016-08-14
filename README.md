# React Bootstrap 4 Tabs

This is a react component to render tabs using <a href="http://v4-alpha.getbootstrap.com/">Bootstrap 4</a> classes.
You should have Bootstrap 4 installed already in your app.

## Demo

- [Demo Site](https://freeranger.github.io/react-bootstrap-tabs-demo)
- [Demo project source](https://github.com/freeranger/react-bootstrap-tabs-demo)


## Usage

1. install the package:
```
npm install react-boostrap-tabs --save
```

### 2. Import component

With ES2015:
```
import {Tabs, Tab} from 'react-bootstrap-tabs';
```

### 3. Add the component markup to your react component

```html
<Tabs onSelect={(index, label) => console.log(label + ' selected')}>
    <Tab label="Tab1">Tab 1 content</Tab>
    <Tab label="Tab2">Tab 2 content</Tab>
</Tabs>
```

## Developing

1. Clone this repo
2. Inside cloned repo run `npm install`
3. If you want to run tests: `npm test` or `npm run testonly` or `npm run test-watch`. Write tests in the `tests` folder. You need at least Node 4 on your machine to run tests.
4. If you want to run linting: `npm test` or `npm run lint`. Fix bugs: `npm run lint-fix`. You can adjust your `.eslintrc` config file.
5. If you want to run transpilation to ES5 in `dist` folder: `npm run prepublish` (standard npm hook).

## License

MIT
