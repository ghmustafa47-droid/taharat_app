# Taharah proposal

An Expo web proposal in English and Urdu, with an overview, a full proposal, and mobile and CMS galleries.

Use Node 20.19.4 or newer. Python 3.10 or newer runs the local preview and regenerates the walkthroughs and captions. The recordings and licensed Noto Urdu fonts are included.

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173. The preview listens on this computer only. Run `python3 prepare-media.py` to regenerate the videos and captions from the recordings in the repository.

## Hosting

Publish only `dist/` for the scan-free export. To serve under a prefix such as `/taharat_app/`, run `TAHARAH_BASE_PATH=/taharat_app npm run build` and serve the resulting directory at that prefix. Redirect the prefix without its trailing slash to the slash version. Serve MP4 files with byte-range support so viewers can seek in the walkthroughs. [Expo’s subpath export guide](https://docs.expo.dev/more/expo-cli/#hosting-with-sub-paths) describes this build setting.

For a private review with scans, place the originals in the parent repository at the paths listed in `inventory.json`. Keep `public/manuscript/` empty. Run `npm run build:private` to write a separate `dist-private/` export. Serve it locally with `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist-private` or put the entire directory behind authenticated hosting, including direct image URLs. The in-page notice and `noindex` metadata are presentation controls. Test that an unauthenticated request for both the page and a scan URL is denied before sharing a hosted private build.

The Figma links use Figma’s own permissions. Before handing off the site, open both prototypes using an intended recipient’s account. Have a qualified reviewer sign off on the worked Wudu example and check both language versions before using it as published lesson material.

## Release checks

Run `npx playwright install chromium webkit` once, then run `npm run build && npm test`. GitHub Actions checks root and subpath exports. Before launch, also check iOS Safari and Android Chrome on physical devices with slower connections, confirm captions and keyboard navigation, and verify that the private preview denies unauthenticated access.
