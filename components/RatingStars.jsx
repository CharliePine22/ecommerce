import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { client } from '../lib/client';
import { toast } from 'react-hot-toast';

const RatingStars = ({
  precision = 0.5,
  totalStars = 5,
  emptyIcon = BsStar,
  filledIcon = BsStarFill,
  product,
}) => {
  const [activeStar, setActiveStar] = useState(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const ratingContainerRef = useRef(null);
  const alreadyUpdated =
    typeof window !== 'undefined' && localStorage.getItem(product.name);

  useEffect(() => {
    if (!product.reviews) return;
    const calculatedRating =
      product.reviews.reduce((partialSum, a) => partialSum + a, 0) /
      product.reviews.length;
    setAverageRating(calculatedRating);
  }, [product.reviews]);

  const calculateRating = (e) => {
    const { width, left } = ratingContainerRef.current.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    const numberInStars = percent * totalStars;
    const nearestNumber =
      Math.round((numberInStars + precision / 2) / precision) * precision;

    return Number(
      nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0)
    );
  };

  const updateRating = async (rating) => {
    if (!alreadyUpdated) {
      const sanityRequest = await client
        .patch(product._id)
        .setIfMissing({ reviews: [] })
        .append('reviews', [rating])
        .commit({ autoGenerateArrayKeys: true });
      console.log(sanityRequest);

      if (sanityRequest._id) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(product.name, rating);
          toast.success(`${product.name} rating updated!`);
          return sanityRequest;
        }
      } else {
        toast.error(
          `Uh oh! We weren't able to update ${product.name} please try again later!`
        );
      }
    } else {
      localStorage.setItem(product.name, rating);
      toast.success(`${product.name} rating updated!`);
      return;
    }
  };

  const handleClick = (e) => {
    setIsHovered(false);
    setActiveStar(calculateRating(e));
    updateRating(calculateRating(e));
  };

  const handleMouseMove = (e) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = (e) => {
    setHoverActiveStar(-1); // Reset to default state
    setIsHovered(false);
  };
  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          position: 'relative',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={ratingContainerRef}
      >
        {[...new Array(totalStars)].map((arr, index) => {
          const activeState = isHovered ? hoverActiveStar : activeStar;

          const showEmptyIcon = activeState === -1 || activeState < index + 1;

          const isActiveRating = activeState !== 1;
          const isRatingWithPrecision = activeState % 1 !== 0;
          const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
          const showRatingWithPrecision =
            isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

          return (
            <Box
              position={'relative'}
              sx={{
                cursor: 'pointer',
              }}
              key={index}
            >
              <Box
                sx={{
                  width: showRatingWithPrecision
                    ? `${(activeState % 1) * 100}%`
                    : '0%',
                  overflow: 'hidden',
                  position: 'absolute',
                }}
              >
                <FilledIcon />
              </Box>
              {/*Note here */}
              <Box
                sx={{
                  color: showEmptyIcon ? 'black' : 'inherit',
                }}
              >
                {showEmptyIcon ? <EmptyIcon /> : <FilledIcon />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default RatingStars;
