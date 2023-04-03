import {LikeRepository,TweetRepository} from '../src/repository/index.js'

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toogleLike(modelId,modelType,userId){ // api/v1/likes/toggle?id=modelid & type=Tweet 
        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.find(modelId);
        } else if(modelType == 'Comment'){
            // TODO
        } else {
            console.log('unknow model type')
        }
        // Whether there exist a like done by a userid on corresponding model
        const exists = await this.likeRepository.findByUserAndLikeable({
            user:userId,
            onModel:modelType,
            likeable:modelId
        })

        if(exists){ // if like exists 
            likeable.likes.pull(exists.id); // remove that likeid
            await likeable.save();
            await exists.deleteOne();
            var isAdded = false;

        }else {
            const newLike = await this.likeRepository.create({
                user:userId,
                onModel:modelType,
                likeable:modelId
            });
            likeable.likes.push(newLike)
            await likeable.save()
            var isAdded = true

        }

        return isAdded

    }
}

export default LikeService;