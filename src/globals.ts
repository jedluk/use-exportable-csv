export function createObjectURL(object: unknown) {
  return window.URL.createObjectURL(object);
}

export function Blob(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob {
  return new window.Blob(blobParts, options);
}
