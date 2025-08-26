import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../services/dummyApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { ring } from "ldrs";
ring.register();

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, name: "", comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load reviews from localStorage (in a real app, this would come from an API)
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]);

  const buyNowRef = useRef(null);
  const addToCartRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-600">Error</h1>
      </div>
    );
  }

  const animateButton = (ref, callback) => {
    if (!ref.current) return;
    ref.current.classList.add("zoom-out");
    setTimeout(() => {
      ref.current.classList.remove("zoom-out");
      if (callback) callback();
    }, 200);
  };

  const handleAddToCart = () => {
    animateButton(addToCartRef, () => dispatch(addToCart(data)));
  };

  const handleBuyNow = () => {
    animateButton(buyNowRef, () => {
      dispatch(addToCart(data));
      navigate("/checkout");
    });
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      user: newReview.name || "Anonymous",
    };

    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setNewReview({ rating: 0, name: "", comment: "" });
    setShowReviewForm(false);
  };

  const renderStars = (rating, size = "w-4 h-4") => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : data?.rating.toFixed(1) || "0.0";

  // Count reviews by rating
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    ratingCounts[review.rating]++;
  });

  return (
    <div className="flex flex-col w-full max-w-6xl px-4 pt-24 mx-auto min-h-[100vh]">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="">
          <div className="w-full md:w-[450px] aspect-[4/3] bg-white shadow-md rounded-lg">
            <img
              src={data?.thumbnail}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{data?.title}</h1>
          <p className="text-lg mt-2">{data?.description}</p>

          <div className="flex items-center mt-2.5 mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(data?.rating)
                      ? "text-yellow-300"
                      : "text-gray-200 dark:text-gray-600"
                    }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-3">
              {data?.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600 ml-3 hover:underline cursor-pointer">
              {reviews.length} reviews
            </span>
          </div>

          {/* Product Details */}
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div><span className="font-semibold">Brand:</span> {data?.brand}</div>
            <div><span className="font-semibold">Weight:</span> {data?.weight}g</div>
            <div><span className="font-semibold">Warranty:</span> {data?.warrantyInformation}</div>
            <div><span className="font-semibold">Return Policy:</span> {data?.returnPolicy}</div>
          </div>

          <span className="text-xl font-semibold mt-2">${data?.price}</span>

          <div className="flex gap-4 mt-4">
            <button
              ref={buyNowRef}
              className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer transition-transform duration-200"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              ref={addToCartRef}
              className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer transition-transform duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="border-t border-gray-300 py-8">
        <h2 className="text-2xl font-bold mb-6">Customer reviews</h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Rating Summary */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold mr-4">{averageRating}</div>
              <div>
                <div className="mb-1">{renderStars(Number(averageRating), "w-5 h-5")}</div>
                <div className="text-sm text-gray-600">{reviews.length} reviews</div>
              </div>
            </div>

            {/* Rating Breakdown */}
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mt-2">
                <div className="text-sm text-blue-600 w-12 hover:underline cursor-pointer">
                  {rating} star
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${(ratingCounts[rating] / reviews.length) * 100 || 0}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-12 text-right">
                  {ratingCounts[rating]}
                </div>
              </div>
            ))}

            <button
              className="mt-6 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded"
              onClick={() => setShowReviewForm(true)}
            >
              Write a review
            </button>
          </div>

          {/* Reviews List: API reviews first, then user reviews */}
          <div className="md:w-2/3">
            {((data.reviews && data.reviews.length > 0) || reviews.length > 0) ? (
              <>
                {/* API reviews */}
                {data.reviews && data.reviews.map((review, idx) => (
                  <div key={review.reviewerEmail || idx} className="border-b border-gray-200 py-6">
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating, "w-4 h-4")}
                      <h3 className="font-bold ml-2">{review.title || ''}</h3>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Reviewed by <span className="font-semibold">{review.reviewerName}</span> on {review.date ? new Date(review.date).toLocaleDateString() : ''}
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                  </div>
                ))}
                {/* User reviews */}
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 py-6">
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating, "w-4 h-4")}
                  
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Reviewed by <span className="font-semibold">{review.user}</span> on {review.date}
                      {review.verified && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-1 rounded">Verified Purchase</span>
                      )}
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="py-6 text-gray-600">
                No reviews yet. Be the first to review this product!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
      
        <div className="fixed inset-0  bg-white/70 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Write a review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex" onMouseLeave={handleStarLeave}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${star <= (hoverRating || newReview.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Review</label>
                <textarea
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;