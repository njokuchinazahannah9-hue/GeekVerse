export async function uploadImage(file) {
  const data = new FormData();

  data.append("file", file);

  data.append(
    "upload_preset",
    "geekverse_upload"
  );

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/jfyklfic/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
}