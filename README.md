# EdgeZ Project Template

A reusable multi-platform EdgeZ starter that displays **Hello World** in three places:

- `site/` — a Next.js web page
- `app/` — an Expo + React Native app
- `firmware/` — Heltec WiFi LoRa 32 V3 firmware for the onboard OLED

[![Use this template](https://img.shields.io/badge/Use%20this-template-238636?style=for-the-badge&logo=github)](https://github.com/new?template_name=template-edgez-project&template_owner=edgez-ai)
[![Deploy on EdgeZ](https://img.shields.io/badge/Deploy%20on-EdgeZ-6c5ce7?style=for-the-badge)](https://appwrite.edgez.ai/console/deploy?repo=https%3A%2F%2Fgithub.com%2Fedgez-ai%2Ftemplate-edgez-project)

Open `hello-world-simple.code-workspace` in VS Code to work with all three
projects together.

The root [`edgez.json`](edgez.json) identifies the EdgeZ project and points to
[`appwrite.config.json`](appwrite.config.json). The Appwrite configuration is the infrastructure
plan for the complete solution: databases and tables, storage buckets, functions, and Sites.

Choose **Use this template** to create your own repository. Its default-branch workflow updates the
deploy button to the new GitHub URL automatically. After selecting an Appwrite project, EdgeZ
applies the complete configuration and queues all function and Site builds automatically.

The deploy button, CI, and Codex should all use the same deterministic Node.js
engine in `infra/`. It invokes a pinned Appwrite CLI and never asks AI to
interpret the manifest. It validates
the plan, compares Git configuration with the selected Appwrite project, and
applies the checked-in configuration in a fixed order.

```sh
export APPWRITE_PROJECT_ID="<PROJECT_ID>"
export APPWRITE_API_KEY="<API_KEY>"
cd infra
npm install
npm run plan
npm run compare
npm run install:solution
```

`install` refuses a dirty worktree by default and writes a local, ignored receipt
under `.edgez/deployments/` containing the Git commit, config SHA-256, target
project, timestamp, and Appwrite CLI version. Commit the config itself for
version control; use `compare` in CI to fail on remote drift. Set
`EDGEZ_ALLOW_DIRTY=true` only for an intentional development deployment. To
remove only the resources declared by this solution, preview
`INFRA_DRY_RUN=1 npm run uninstall:solution`, then run
`npm run uninstall:solution` with explicit authorization. Users and unrelated
project resources are preserved.

## Run locally

Install the JavaScript dependencies once:

```sh
(cd site && npm install)
(cd app && npm install)
```

Start the web app:

```sh
cd site
npm run web
```

Start the React Native app in the EdgeZ Android DevTools client connected at
`127.0.0.1:5555`:

```sh
cd app
npm run android
```

Build or upload the Heltec firmware with PlatformIO:

```sh
cd firmware
pio run
pio run --target upload
pio device monitor
```

The firmware prints `Hello World` to the serial console and displays it on the
board's 128x64 OLED. The Heltec V3 display uses SDA 17, SCL 18, reset 21, and
active-low Vext power on GPIO 36.

## Validate

```sh
(cd site && npm run typecheck && npm run build)
(cd app && npm run typecheck)
(cd firmware && pio run)
```
