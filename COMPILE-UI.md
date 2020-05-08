**NOTE: THIS FILE IS NEEDED JUST FOR DEVELOPERS OF THIS PROJECT, IF YOU AREN'T YOU CAN IGNORE IT**

This file explains how to compile files for the UI.

# What you need to do just the first time

1. Download and install Node.js, you can download it [here](https://nodejs.org/en/download/) (also installs npm)

2. Once you have finished to install Node.js, check if everything is ok by running

```console
$ node -v
```
and then
```console
$ npm -v
```

If you see the corresponding versions of node and npm, you are ready to code!

3. Go to the root of this project, open your favorite prompt and run

```console
$ npm i
```

# Scripts

## Development

By simply running

```console
$ npm run dev
```

you will have 2 tasks running at the same time:
- the Python server
- the [rollup](https://rollupjs.org/guide/en/) watcher pointing to the configured `.js` file and ready to re-bundle

**You can now go to http://127.0.0.1:33333 and see the app running.**

You can edit `.css` and `.js` files and simply refresh the page to see your new and surely awesome code directly in the app 😉

However, if you need to edit the `public/index.html` file you  have to kill the terminal and re-run `npm run dev` to see your edits.

## Building

If you want to deploy your application, you have to run

```console
$ npm run build
```

This is necessary to get a bundled `.js` file **minified**, helping to drop the final application size.

# Other

If you notice that another team member installed one or more new packages, just run

```bash
$ npm i
```

and you will be ok