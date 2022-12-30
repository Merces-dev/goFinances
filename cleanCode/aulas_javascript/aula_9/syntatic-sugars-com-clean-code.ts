function getFirstFiveRatings(ratings) {
    if(ratings.length >= 5){
        return ratings.slice(0, 5)
    }
}

function sumFirstFiveRatings(ratings) {
    const ratingsBool = Boolean(ratings)

    if (ratingsBool) {
        const firstFiveRatings = getFirstFiveRatings(ratings)

        if (!firstFiveRatings) return { error: 'there must be at least 5 ratings' }

        let ratingsSum = 0;

        for (var i = 0; i < firstFiveRatings.length; i++) {
            ratingsSum += Number(firstFiveRatings[i])
        }

        return { ratingsSum, created_at: Number(new Date()) }
    }

    return { error: 'ratings is required' }
}

const appRatings = ['5', '3', '4', '4', '5', '1', '5', '4', '4', '3']
sumFirstFiveRatings(appRatings)