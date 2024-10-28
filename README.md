## What is this?

Simple tool for showing multiple pdf's inside multiple folders in the same presentation

## How To

### Run in development mode

With Deno installed run

```bash
deno run dev
```

### Use

[Click me](http://localhost:4200/src/templates/index.html) or manually go
to http://localhost:4200/src/templates/index.html to start using the application

### Build and run in production mode

With Deno installed run

```bash
# this will build the executable for linux
deno run build:linux

# this will build the executable for windows in .exe format
deno run build:windows
```

Locate the respective file in the source folder:

- start (for linux)
- start.exe (for windows)