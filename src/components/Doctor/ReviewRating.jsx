// import React, { useState } from 'react';
// import axios from 'axios';

// const decodeJWT = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// const ReviewRating = ({ doctorId, onReviewSubmitSuccess }) => {
//   const [reviewData, setReviewData] = useState({
//     comment: '',
//     rating: '',
//   });
//   const [error, setError] = useState(null);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('No authentication token found. Please log in.');
//       return;
//     }

//     const decodedToken = decodeJWT(token);
//     console.log('Decoded Token:', decodedToken);

//     const reviewPayload = {
//       comment: reviewData.comment,
//       rating: parseInt(reviewData.rating, 5), // Ensure rating is sent as a number
//     };

//     console.log('Review Data:', reviewPayload);

//     try {
//       const response = await axios.post(`http://localhost:3000/api/v1/reviews/${doctorId}`, reviewPayload, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Review submission response:', response.data);
//       alert('Review submitted successfully!');
//       onReviewSubmitSuccess(); // Callback after a successful review submission
//     } catch (error) {
//       console.error('Error submitting review:', error.response ? error.response.data.message : error.message);
//       setError(error.response ? error.response.data.message : 'Failed to submit review. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Submit a Review and Rating</h2>
//       {error && <div className="text-red-500">{error}</div>}
//       <form onSubmit={handleReviewSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="comment" className="block text-sm font-medium">Your Review</label>
//           <textarea
//             id="comment"
//             value={reviewData.comment}
//             onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
//             className="mt-1 block w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
//           <select
//             id="rating"
//             value={reviewData.rating}
//             onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
//             className="mt-1 block w-full border rounded p-2"
//             required
//           >
//             <option value="">Select Rating</option>
//             <option value="1">1 - Poor</option>
//             <option value="2">2 - Fair</option>
//             <option value="3">3 - Good</option>
//             <option value="4">4 - Very Good</option>
//             <option value="5">5 - Excellent</option>
//           </select>
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewRating;








import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewRating = ({ doctorId }) => {
  const [reviewData, setReviewData] = useState({ comment: '', rating: '' });
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Function to calculate the average rating
  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  // Fetch reviews for the doctor
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/reviews/${doctorId}`);
        const fetchedReviews = response.data;

        setReviews(fetchedReviews);
        setAverageRating(calculateAverageRating(fetchedReviews));
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
       
      }
    };

    fetchReviews();
  }, [doctorId]);

  // Handle Review Submission

  // Handle Review Submission
const handleReviewSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token'); // Use token for authentication
  
  if (!token) {
    alert('You need to be logged in to post a review.');
    return;
  }

  const reviewPayload = {
    comment: reviewData.comment,
    rating: parseInt(reviewData.rating, 10), // Convert rating to number
  };

  try {
    const response = await axios.post(`http://localhost:5000/api/v1/reviews/${doctorId}`, reviewPayload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });

    // Log the response data to the console
    console.log('Review submission response:', response.data);

    // Handle success
    setSuccessMessage('Review submitted successfully!');
    setReviewData({ comment: '', rating: '' }); // Reset form

    // Fetch reviews again to update the list
    const updatedReviews = await axios.get(`http://localhost:5000/api/v1/reviews/${doctorId}`);
    setReviews(updatedReviews.data);
    setAverageRating(calculateAverageRating(updatedReviews.data));
  } catch (error) {
    console.error('Error submitting review:', error.message);
    setError('Failed to submit review. Please try again.');
  }
};

 


  return (
    <div className="w-full max-w-lg mx-auto">
      
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium">Your Review</label>
          <textarea
            id="comment"
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
          <select
            id="rating"
            value={reviewData.rating}
            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Doctor Reviews</h2>

      <div className="text-xl font-semibold">
        Average Rating: {averageRating ? averageRating.toFixed(1) : 'No ratings yet'}
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border p-4 my-2 rounded">
            <h3 className="font-bold">{review.userId.name}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewRating;
