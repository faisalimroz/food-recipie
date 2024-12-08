import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { TiTickOutline } from 'react-icons/ti';
import axios from 'axios';
import { getFromLocalStorage } from '../../utils/local-storage';
import Form from '../UI/Forms/Form';
import FormTextArea from '../UI/FormTextArea/FormTextArea';

const Review = ({ serviceId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const accessToken = getFromLocalStorage('accessToken');


  const onSubmit = async (values) => {
    if (rating > 0 && values.comment.trim() !== '') {
      const reviewData = { rating, comment: values.comment, serviceId };

      try {
        setLoading(true);
        
        // Make API request manually using axios
        const response = await axios.post(`https://food-hud-backend.vercel.app/api/v1/review`, reviewData,{
            headers: {
              Authorization: accessToken
            }
          });
        
        if (response.data) {
          toast("Review submitted successfully", {
            icon: <span style={{ marginRight: -8, fontSize: 22 }}><TiTickOutline /></span>,
            style: {
              borderRadius: "10px",
              background: "#22c55e",
              color: "#fff",
            },
            duration: 2000,
          });
          setRating(0);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to submit review", {
          style: {
            borderRadius: "10px",
            background: "#e74c3c",
            color: "#fff",
          },
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please add a rating and comment", {
        style: {
          borderRadius: "10px",
          background: "#e74c3c",
          color: "#fff",
        },
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-8">
        <h5 className="text-2xl font-semibold mb-4">Reviews</h5>

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
              loading
                ? 'w-[150px] opacity-50 cursor-not-allowed inline-flex justify-center items-center'
                : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Submit Review'}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Review;
