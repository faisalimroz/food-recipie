import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Form from "../../Components/UI/Forms/Form";
import FormInput from "../../Components/UI/FormInput/FormInput";
import FormTextArea from "../../Components/UI/FormTextArea/FormTextArea";
import FormSelectField from "../../Components/UI/FormSelectField/FormSelectField";
import { countryCategoryOptions, foodCategoryOptions } from "../../constants/constants";
import { getFromLocalStorage } from "../../utils/local-storage";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipeImage, setRecipeImage] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipeImage(file);
  };

  const uploadImageToImgbb = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("https://api.imgbb.com/1/upload?key=71d0092557b7de03a515d96f97ad1533", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (values) => {
    try {
      const accessToken = getFromLocalStorage('accessToken');
      const imageUrl = await uploadImageToImgbb(recipeImage);
      if (imageUrl) {
        values.recipeImage = imageUrl;
      }
      
      const res = await axios.post('https://food-hud-backend.vercel.app/api/v1/recipe', values, {
        headers: {
          Authorization: accessToken
        }
      });

      if (res) {
        setRecipeImage(null);
        toast.success("Recipe Added Successfully", {
          style: {
            borderRadius: "10px",
            background: "#22c55e",
            color: "#fff",
          },
          duration: 2000,
        });

        // setTimeout(() => {
        //   navigate(`/recipe/${res?.data?.data?._id}`);
        // }, 2000);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to add recipe. Please try again.");
    }
  };

  return (
   <div>
     <Toaster position="top-center" reverseOrder={false} />
     <div className="p-6 ">
  
  <div className="bg-white  rounded-lg p-6 space-y-6">
      <h2 className="text-3xl font-bold text-[#2a2a3d] mb-6">Add a New Recipe</h2>
  <Form submitHandler={onSubmit} >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput name="recipeName" label="Recipe Name" placeholder="Enter recipe name" />
          </div>
    
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="recipeImage" className="block text-sm font-medium text-gray-700 mb-1">Recipe Image URL</label>
            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
              id="recipeImage"
              className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="Enter image URL"
              required
            />
          </div>
        </div>
    
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormSelectField
                    name="category"
                    label="Category"
                    options={foodCategoryOptions}
                  />
          </div>
    
          <div className="w-full md:w-1/2 px-3">
          <FormSelectField
                    name="country"
                    label="Country"
                    options={countryCategoryOptions}
                  />
          </div>
          
        </div>
  
        <div className="w-full  px-3">
        <FormInput name="embeddedVideoCode" label="Embedded Youtube Video Code" />
          </div>
    
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
          <FormTextArea name="recipeDetails" label="Recipe Details" rows={5}  placeholder="write about recipe" />
          </div>
        </div>
    
      
    
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-white bg-[#22c55e] hover:bg-[#28a745] px-4 py-2 rounded-md text-md font-bold"
          >
            Save Recipe
          </button>
          <button
            type="button"
            className="text-gray-500 hover:underline"
          
          >
            Cancel
          </button>
        </div>
      </Form>
  </div>
    
    </div>
   </div>

  );
};

export default CreateRecipe;
