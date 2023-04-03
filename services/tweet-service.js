import { TweetRepository,HashtagRepository } from "../src/repository/index.js";

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    // get data from frontend
    async create(data){
        const content = data.content
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
                            .map((tag)=>tag.substring(1).toLowerCase())
                        
        
        // this regex extracts hashtag
  
        // tags array contains the tag which is in new tweet
        // post into database
        const tweet = await this.tweetRepository.create(data)
        /* Then the challenge is to compare the tags already present in the database to current tags array
           We will logically separate out the new tags in current array and will push them in a database
        */
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags)
        console.log(alreadyPresentTags)
        let titleofPresentTags = alreadyPresentTags.map(tags => tags.title)

        let newTags = tags.filter(tag => !titleofPresentTags.includes(tag))
        newTags = newTags.map(tag=>{
            return {title:tag, tweets:[tweet.id]}
        })

        const response = await this.hashtagRepository.bulkCreate(newTags)
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id)
            tag.save()
        })
        // todo create hashtags and add here
        /*
         1. bulk create in mongoose
         2. filter title of hashtags based on multiple tags
         3. how to add tweet id inside all the hashtags

        */

        return tweet
    }

    async get(tweetId){
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet
    }
}

export default TweetService


/*
content-
tweet look like
this is my #first #tweet. I am really #excited

*/
