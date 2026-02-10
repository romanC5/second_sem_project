import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../services/dummyApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { Star, ShoppingCart, Zap, PackageCheck, RotateCcw, Weight, Shield, Truck } from "lucide-react";
import { ring } from "ldrs";
import { getImageUrl } from "@/lib/utils";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/Components/ui/dialog";

ring.register();

const RatingStars = ({ rating, size = 16, interactive = false, onHover, onClick, onLeave }) => (
  <div className="flex items-center gap-0.5" onMouseLeave={onLeave}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`${
          star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground/30"
        } ${interactive ? "cursor-pointer transition-colors" : ""}`}
        onClick={() => interactive && onClick?.(star)}
        onMouseEnter={() => interactive && onHover?.(star)}
      />
    ))}
  </div>
);

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, name: "", comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
        <p className="text-muted-foreground">Could not load product details.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => dispatch(addToCart(data));

  const handleBuyNow = () => {
    dispatch(addToCart(data));
    navigate("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      user: newReview.name || "Anonymous",
    };
    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ rating: 0, name: "", comment: "" });
    setShowReviewForm(false);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : data?.rating?.toFixed(1) || "0.0";

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    ratingCounts[r.rating]++;
  });

  const totalReviewCount = (data?.reviews?.length || 0) + reviews.length;
  const images = data?.images?.length ? data.images.map(img => getImageUrl(img)) : [data?.thumbnail];
  const discountedPrice = data?.discountPercentage
    ? (data.price * (1 - data.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="flex flex-col w-full max-w-6xl px-4 pt-24 pb-12 mx-auto min-h-screen">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Image Gallery */}
        <div className="lg:w-1/2 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-muted/30 flex items-center justify-center">
                <img
                  src={images[selectedImage]}
                  alt={data?.title}
                  className="w-full h-full object-contain p-6"
                />
              </div>
            </CardContent>
          </Card>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === i
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {data?.brand && <Badge variant="secondary">{data.brand}</Badge>}
              {data?.availabilityStatus && (
                <Badge variant={data.stock > 0 ? "success" : "destructive"}>
                  {data.availabilityStatus}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{data?.title}</h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">{data?.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <RatingStars rating={Math.round(data?.rating)} />
            <Badge variant="info">{data?.rating?.toFixed(1)}</Badge>
            <span className="text-sm text-muted-foreground">
              {totalReviewCount} review{totalReviewCount !== 1 ? "s" : ""}
            </span>
          </div>

          <Separator />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${discountedPrice || data?.price}
            </span>
            {discountedPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${data.price}</span>
                <Badge variant="destructive">-{data.discountPercentage.toFixed(0)}%</Badge>
              </>
            )}
          </div>

          <Separator />

          {/* Product Meta */}
          <div className="grid grid-cols-2 gap-3">
            {data?.weight && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Weight size={16} />
                <span>{data.weight}g</span>
              </div>
            )}
            {data?.warrantyInformation && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} />
                <span>{data.warrantyInformation}</span>
              </div>
            )}
            {data?.returnPolicy && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw size={16} />
                <span>{data.returnPolicy}</span>
              </div>
            )}
            {data?.shippingInformation && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck size={16} />
                <span>{data.shippingInformation}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {data?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button size="lg" onClick={handleBuyNow} className="flex-1">
              <Zap size={18} />
              Buy Now
            </Button>
            <Button size="lg" variant="outline" onClick={handleAddToCart} className="flex-1">
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
          </div>

          {/* Minimum order / stock info */}
          {data?.minimumOrderQuantity && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <PackageCheck size={14} />
              Minimum order: {data.minimumOrderQuantity} unit{data.minimumOrderQuantity > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* Tabs: Details & Reviews */}
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="reviews">
            Reviews ({totalReviewCount})
          </TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Summary */}
                <div className="md:w-1/3 space-y-4">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-bold">{averageRating}</div>
                    <div className="mt-2">
                      <RatingStars rating={Math.round(Number(averageRating))} size={20} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {totalReviewCount} review{totalReviewCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <Separator />

                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-12 text-muted-foreground">{rating} star</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all"
                            style={{
                              width: `${reviews.length ? (ratingCounts[rating] / reviews.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8 text-right">
                          {ratingCounts[rating]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </Button>
                </div>

                <Separator orientation="vertical" className="hidden md:block" />

                {/* Reviews List */}
                <div className="md:w-2/3 space-y-1">
                  {(data.reviews?.length > 0 || reviews.length > 0) ? (
                    <>
                      {data.reviews?.map((review, idx) => (
                        <div key={review.reviewerEmail || idx} className="py-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {review.reviewerName?.charAt(0)?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{review.reviewerName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {review.date ? new Date(review.date).toLocaleDateString() : ""}
                                </span>
                              </div>
                              <RatingStars rating={review.rating} size={14} />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                      {reviews.map((review) => (
                        <div key={review.id} className="py-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {review.user?.charAt(0)?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{review.user}</span>
                                  {review.verified && (
                                    <Badge variant="info" className="text-[10px] px-1.5 py-0">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <RatingStars rating={review.rating} size={14} />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Star size={40} className="text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground">No reviews yet.</p>
                      <p className="text-sm text-muted-foreground">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data?.brand && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{data.brand}</span>
                  </div>
                )}
                {data?.category && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{data.category}</span>
                  </div>
                )}
                {data?.weight && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">{data.weight}g</span>
                  </div>
                )}
                {data?.dimensions && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span className="font-medium">
                      {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm
                    </span>
                  </div>
                )}
                {data?.warrantyInformation && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-medium">{data.warrantyInformation}</span>
                  </div>
                )}
                {data?.returnPolicy && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Return Policy</span>
                    <span className="font-medium">{data.returnPolicy}</span>
                  </div>
                )}
                {data?.shippingInformation && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{data.shippingInformation}</span>
                  </div>
                )}
                {data?.sku && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">SKU</span>
                    <span className="font-medium">{data.sku}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Share your experience with this product.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <RatingStars
                rating={hoverRating || newReview.rating}
                size={28}
                interactive
                onHover={(r) => setHoverRating(r)}
                onClick={(r) => setNewReview({ ...newReview, rating: r })}
                onLeave={() => setHoverRating(0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewer-name">Your Name</Label>
              <Input
                id="reviewer-name"
                placeholder="Enter your name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewer-comment">Review</Label>
              <Textarea
                id="reviewer-comment"
                placeholder="Tell us what you think..."
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleProduct;