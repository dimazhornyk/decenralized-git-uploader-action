# decentralized-git-uploader-action

Action for zipping files and sending to the server for uploading to decentralized storage

## Usage

```yaml
name: Send Files

on:
  push:
    branches:
      - main

jobs:
  send-files:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: dimazhornyk/decentralized-git-uploader-action@v1
        with:
          server_url: https://somedomain.com
          repo_name: $${{ github.event.repository.name }}
          action_token: ${{ secrets.ACTION_TOKEN }}
```
