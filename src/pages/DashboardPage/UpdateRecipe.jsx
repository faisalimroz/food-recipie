import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Form from "../../Components/UI/Forms/Form";
import FormInput from "../../Components/UI/FormInput/FormInput";
import FormTextArea from "../../Components/UI/FormTextArea/FormTextArea";
import FormSelectField from "../../Components/UI/FormSelectField/FormSelectField";
import { countryCategoryOptions, foodCategoryOptions } from "../../constants/constants";
import { getFromLocalStorage } from "../../utils/local-storage";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = getFromLocalStorage('accessToken');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://food-hud-backend.vercel.app/api/v1/recipe/${id}`, {
          headers: {
            Authorization: accessToken
          }
        });

        setRecipeData(res?.data?.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipe data:", err);
        toast.error("Failed to fetch recipe details.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      const accessToken = getFromLocalStorage('accessToken');
      console.log(accessToken,'43')

      const res = await axios.patch(`https://food-hud-backend.vercel.app/api/v1/recipe/update/${id}`, values, {
        headers: {
          Authorization: accessToken
        }
      });

      if (res) {
        toast.success("Recipe Updated Successfully", {
          style: {
            borderRadius: "10px",
            background: "#22c55e",
            color: "#fff",
          },
          duration: 3000,
        });
      }
     setTimeout(()=>{
      navigate("/dashboard/recipe");
     },3000)
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner here
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-6">
        <div className="bg-white rounded-lg p-6 space-y-6">
          <h2 className="text-3xl font-bold text-[#2a2a3d] mb-6">Update Recipe</h2>
          <Form submitHandler={onSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <FormInput
                  name="recipeName"
                  label="Recipe Name"
                  placeholder="Enter recipe name"
                  defaultValue={recipeData?.recipeName} 
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <FormSelectField
                  name="category"
                  label="Category"
                  options={foodCategoryOptions}
                  defaultValue={recipeData.category} // Set default value
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <FormSelectField
                  name="country"
                  label="Country"
                  options={countryCategoryOptions}
                  defaultValue={recipeData.country} // Set default value
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <FormInput
                  name="embeddedVideoCode"
                  label="Embedded Youtube Video Code"
                  defaultValue={recipeData.embeddedVideoCode} // Set default value
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <FormTextArea
                  name="recipeDetails"
                  label="Recipe Details"
                  rows={5}
                  placeholder="write about recipe"
                  defaultValue={recipeData.recipeDetails} // Set default value
                />
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

export default UpdateRecipe;
