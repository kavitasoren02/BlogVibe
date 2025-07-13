import { useEffect, useState } from "react";
import mediabg from "../../assets/mediabg.jpeg";
import { GET_ALL_IMAGE, IMAGE_UPLOAD } from "../../Service/useApiService";
import { toast } from "react-toastify";
import { _get, _post } from "../../Service/ApiService";

const Media = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const[updateList, setUpdateList] = useState(0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        setIsLoading(true);

        const { data } = await _post(IMAGE_UPLOAD, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("File uploaded successfully.");
        setUpdateList(prev => prev + 1);
      } catch (error) {
        toast.warn(
          error.response?.data?.message ||
            "An error occurred while uploading the image"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getAllImage = async () => {
    try {
      const { data } = await _get(GET_ALL_IMAGE);
      setImageData(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, [updateList]);


  const copyImageURL = async(url) => {
    try{
      await navigator.clipboard.writeText(url);
      toast.success("Image URL copied")
    }catch(error){
      toast.error("Failed to copy URL");
    }
  }
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mediabg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-10 pt-10">
        <h1 className="text-3xl font-bold text-white">Media Library</h1>

        <button
          onClick={() => document.getElementById("imageInput").click()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      <div className="relative">
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Uploaded Image Preview */}
      <div
        className="p-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {imageData.map(({ _id, url }) => (
          <img
          onClick={() => copyImageURL(url)}
            key={_id}
            src={url}
            alt="Uploaded Preview"
            className="w-64 h-64 object-cover rounded-lg shadow-lg border-2 border-white cursor-pointer"
          />
        ))}{" "}
        {!imageData.length && !isLoading && (
          <p className="col-span-full text-center text-white/80">
            No images yet. Upload some!
          </p>
        )}
      </div>
    </div>
  );
};

export default Media;
