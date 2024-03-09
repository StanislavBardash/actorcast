/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.model.Review;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.MovieRepository;
import ru.isu.ru.backend.repository.ReviewRepository;

/**
 *
 * @author barda
 */
@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    
//    public ReviewService(ReviewRepository reviewRepository) {
//        this.reviewRepository = reviewRepository;
//    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
    public Review getReviewById(Integer id) {
        Review ans = reviewRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Review not found with ID: " + id);
        }
        else{
        return ans;
        }
    }
    
    public List<Review> getReviewsForActor(Integer id){
        return reviewRepository.findForActor(id);
    }

    public Review updateReview(Integer id, Review updatedReview) {
        Review review = getReviewById(id);
        review.setActor(updatedReview.getActor());
        review.setDirector(updatedReview.getDirector());
        review.setMovie(updatedReview.getMovie());
        review.setRating(updatedReview.getRating());
        review.setComment(updatedReview.getComment());
        review.setDate(updatedReview.getDate());
        return reviewRepository.save(review);
    }

    public void deleteReview(Integer id) {
        reviewRepository.deleteReview(id);
    } 
}
