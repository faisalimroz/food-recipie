import React, { useState } from "react";
import { useAddTaskMutation } from "../../redux/api/taskApi";
import Form from "../../Components/UI/Forms/Form";
import FormInput from "../../Components/UI/FormInput/FormInput";
import FormTextArea from "../../Components/UI/FormTextArea/FormTextArea";
import toast, { Toaster } from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskSchema } from "../../schemas/taskSchema";
import FormSelectField from "../../Components/UI/FormSelectField/FormSelectField";
import { countryCategoryOptions, foodCategoryOptions } from "../../constants/constants";
import { getFromLocalStorage } from "../../utils/local-storage";
import axios from "axios";

const AddRecipe = () => {
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

      const response = await fetch("https://api.imgbb.com/1/upload?key=6e9d595b9438df4b9e5e111b9bbe1786", {
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
      
      console.log(values, '40');
      const res =   await axios.post('https://food-hud-backend.vercel.app/api/v1/recipe', values,{
        headers: {
          Authorization: accessToken
        }
      });
      console.log(res,'56')
      if(res){
        setRecipeImage("")
        toast(`Recipe Added Successfully `, {
          
          style: {
              borderRadius: "10px",
              background: "#22c55e",
              color: "#fff",
          },
          duration: 2000,
      });
        setTimeout(() => {
          navigate(`/recipe/${res?.data?.data?._id}`);
        }, 2000);

      }
     
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="my-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Add Recipe</h2>

          <Form submitHandler={onSubmit} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormInput name="recipeName" label="Recipe Name" />
              </div>
              <div>
                <label className="block mb-2">Recipe Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div>
                <FormInput name="embeddedVideoCode" label="Embedded Youtube Video Code" />
              </div>
              <div>
               
                <FormSelectField
                  name="country"
                  label="Country"
                  options={countryCategoryOptions}
                />
              </div>
              <div>
                <FormSelectField
                  name="category"
                  label="Category"
                  options={foodCategoryOptions}
                />
              </div>
              <div className="col-span-2">
                <FormTextArea name="recipeDetails" label="Recipe Details" rows={4} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
