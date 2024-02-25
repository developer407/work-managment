export const uploadToCloudinary = async (file, fileType) => {
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "zosh-social");
    data.append("cloud_name", "dcpesbd8q");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dcpesbd8q/${fileType}/upload`,
        {
          method: "post",
          body: data,
        }
      );

      const fileData = await res.json();
      console.log("url : ", fileData);
      return fileData.url;
    } catch (error) {
      console.log("catch error ", error);
    }
  } else {
    console.log("error");
  }
};
