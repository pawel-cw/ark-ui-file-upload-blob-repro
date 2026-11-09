# FileUpload.ItemPreviewImage produces intermittent ERR_FILE_NOT_FOUND requests

## Description

Selecting, removing, and re-selecting PNG/JPG files can produce failed `blob:` requests with `net::ERR_FILE_NOT_FOUND`. The final image preview can still display correctly.

## Reproduction

[Minimal Reproduction Repo](https://github.com/pawel-cw/ark-ui-file-upload-blob-repro)

The example uses controlled `acceptedFiles`, a derived array containing the same `File` objects, and a parent-state update after selection. StrictMode is disabled.

## Steps to reproduce

1. Clone the reproduction repository, run `npm ci` and `npm run dev`, and open the local Vite URL in Chrome/Chromium.
2. Open DevTools, select the Network tab, and enable **Disable cache**.
3. Set CPU throttling to **4x slowdown** in the Performance panel.
4. Choose a PNG or JPG and wait for its preview.
5. Click **Remove**, then choose the same or another image.
6. Repeat and inspect the `blob:` requests for `net::ERR_FILE_NOT_FOUND`.

The failure is intermittent; not every run or selection produces it.

## Expected result

No failed Blob URL requests during selection, re-renders, removal, or re-selection.

## Actual result

Some Blob requests fail with `net::ERR_FILE_NOT_FOUND`, even though the final preview loads.

## Environment

- Ark UI React 5.40.0
- React / React DOM 18.3.1
- Chromium 156.0.8078.4 on macOS

## Possible cause

`FileUploadItemPreviewImage` creates its URL in an effect depending on entire context objects:

```tsx
useEffect(() => {
  return fileUpload.createFileUrl(itemProps.file, (url) => setUrl(url));
}, [itemProps, fileUpload]);
```

[Ark UI source](https://github.com/chakra-ui/ark/blob/686ace7474b7edfcd0c8c13fea76a5ab9e8d4df4/packages/react/src/components/file-upload/file-upload-item-preview-image.tsx)

The returned cleanup immediately revokes the URL. Context changes may therefore revoke a URL before the image stops using it, even when the `File` is unchanged.

Tying URL ownership to the File and clearing the image source before revocation may avoid this race.
