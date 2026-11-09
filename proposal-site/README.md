# Taharah proposal

An Expo web proposal in English and Urdu. It includes a short overview, a full proposal, and galleries of the mobile and CMS designs.

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173. The preview listens on this computer only. Stop it with Ctrl+C.

The walkthroughs and captions are included. Run `python3 prepare-media.py` to regenerate them from the recordings in the repository.

Original manuscript scans are held separately. To build a private review copy with scans, supply the original files in the locations listed in `inventory.json`, run the media script, then use `EXPO_PUBLIC_SHOW_MANUSCRIPTS=1 npm run build`. Access to those files depends on where that build is served.
