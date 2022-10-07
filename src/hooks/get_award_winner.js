const useWinner = (award, movies) => {
  var winner = null;
  var winners = [];
  var highest_votes = 0;

  movies.forEach((movie) => {

    // Check if movie is nominated in award
    movie.nominations.forEach((nomination) => {
        // If movie has a nomination with award_id matching the id of current award
        // the movie should be displayed under this award
        if(nomination.award_id === award.id){

            // Evaluate if the movie is winning in the award votes
            if(nomination.votes > highest_votes){
                highest_votes = nomination.votes
                winner = movie
                winners = []
            }else if(nomination.votes === highest_votes){
                // Muliple winners
                // Add current winner
                winners.push(winner)

                // Then the current movie
                winners.push(movie)

                winner = null
            }
        }
    });
      
  })
  return [winner, winners];
};

export default useWinner;

