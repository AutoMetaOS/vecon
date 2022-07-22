# VErsion CONtrol

<div align="center">
  <img src="./shared/icon.svg" alt="Svelte" width="200" />
  <h1>VE COn</h1>
</div>


# Get
Based on [create-svelte](https://github.com/sveltejs/kit/tree/master/packages/create-svelte). Pronounced as "V-co" (the `n` is silent, Why? because why not)

```bash
$ npm i -g vecon
```
# Run Order
- version bump to `package.json`
- `npm publish`
- git add .
- git commit -m "message from prompt"
- git push

# Usage
For one shot version update and publish/deploy
```json
{
  // package.json
  "scripts":{
    "prepublish": "<before VERSION BUMP(optional)>",
    "vecon": "<SCRIPTS B/W VERSION BUMP & NPM PUBLISH(optional)>",
    "publish":"vecon publish", // Follow Prompts
    "postpublish": "<after NPM PUBLISH(optional)>"
  }
}
```

# TODO
- Add `deploy` Script
- Add `vecon.config.json` for config
- Add options:
- - `--no-git` to skip git commands
- - `--no-ver` to skip version bump

## License
[MIT](./LICENSE)