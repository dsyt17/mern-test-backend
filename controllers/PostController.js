import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'cant get post'
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: {viewsCount: 1},
        }, {
            returnDocument: 'after',
        },
        (err, doc) => {
            if (err) {
                console.log(error);
                return res.status(500).json({
                message: 'cant get post by id'
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'cant find post'
                });
            }
            res.json(doc);
        },
        ).populate('user');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'cant get post'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findByIdAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                message: 'cant remove post by id'
                });
            }

            if (!doc) {
                return res.status(404).json({
                message: 'cant find post'
                });
            }
            res.json({success: true,});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: 'cant remove post'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'post error'
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        }, 
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.body.userId,
            tags: req.body.tags,
        });

        res.json({success: true,});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'update post error'
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj)=>obj.tags).flat().slice(0,5);

        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'cant get post'
        });
    }
};