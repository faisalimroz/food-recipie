import React, { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import { getFromLocalStorage } from '../../utils/local-storage';
import Form from '../UI/Forms/Form';
import FormTextArea from '../UI/FormTextArea/FormTextArea';
import toast, { Toaster } from 'react-hot-toast';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const accessToken = getFromLocalStorage('accessToken');

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://food-hud-backend.vercel.app/api/v1/review/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      setReviews(response?.data?.data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const onSubmit = async (values) => {
    if (rating > 0 && values.comment.trim() !== '') {
      const reviewData = { rating, comment: values.comment, serviceId: id };

      try {
        setLoading(true);

        const response = await axios.post(`https://food-hud-backend.vercel.app/api/v1/review`, reviewData, {
          headers: {
            Authorization: accessToken,
          },
        });

        if (response.data) {
          toast("Review submitted successfully", {
            style: {
              borderRadius: '10px',
              background: '#22c55e',
              color: '#fff',
            },
            duration: 2000,
          });
          setRating(0);
          fetchReviews(); // Re-fetch the reviews after successfully submitting a review
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to submit review", {
          style: {
            borderRadius: '10px',
            background: '#e74c3c',
            color: '#fff',
          },
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://food-hud-backend.vercel.app/api/v1/recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://food-hud-backend.vercel.app/api/v1/recipe/suggestion/${id}`);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchRecipe();
    fetchSuggestions();
    fetchReviews(); // Fetch reviews when the component mounts
  }, [id, accessToken]);

  if (!recipe) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto bg-white sm:px-6 md:px-[6rem] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className=" text-center text-4xl font-semibold  mt-8 pb-12">{recipe.recipeName} Recipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-4">
              <div className=" rounded-lg overflow-hidden">
                <div className="w-full h-[300px] md:h-[400px]">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${recipe.embeddedVideoCode}`}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded overflow-hidden my-12">
          <h5 className="text-2xl font-semibold py-4">Overview</h5>
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  className="h-full w-full object-cover rounded-l-lg"
                />
                <div className="absolute top-0 right-0 m-4 bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.country}
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{recipe.recipeName}</h2>
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    <FaShoppingCart className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="text-gray-700 text-sm">{recipe.purchased_by.length} purchased</span>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="text-gray-700 text-sm">{recipe.creatorEmail}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{recipe.recipeDetails}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h5 className="text-2xl font-semibold mb-4">Submit Your Review</h5>
            <Form submitHandler={onSubmit}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        className="hidden"
                      />
                      <FaStar
                        className="cursor-pointer"
                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>

              <FormTextArea name="comment" rows={5} placeholder="Add a comment" />

              <button
                type="submit"
                className={`text-white bg-[#22c55e] inline-flex items-center justify-center px-4 py-2 rounded text-md border border-[#22c55e] ${
                  loading ? 'w-[150px] opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Submit Review'}
              </button>
            </Form>
          </div>

          <div className="container mx-auto my-6">
            <div className="gap-6">
              {/* ReviewCard Section */}
              <div className="col-span-4">
                <ReviewCard reviews={reviews} />
              </div>

              {/* Recipe Suggestions Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe Suggestions</h2>
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={`/recipe/${suggestion._id}`}
                    className="flex flex-col md:flex-row justify-between rounded-lg bg-white p-4 border mb-2"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-lg">{suggestion.recipeName}</div>
                      <div className="text-sm text-gray-600">
                        {suggestion.recipeDetails.split(' ').slice(0, 20).join(' ')}...
                      </div>
                    </div>
                    <div
                      className="ml-4 mt-4 md:mt-0 h-[95px] w-[95px] flex-none rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${suggestion.recipeImage})` }}
                    ></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
