const router = require('express').Router();
const { WallMessage } = require('../models/wallMessage');
const multer  = require('multer');
const fs = require("fs");

router.get('/', async(req, res) => {
    try {
        
        // await new WallMessage({title:"first try", author:"dinellimichele00@gmail.com", body:"hello guys",
        // comments: [{author:"pino", text:"great post man"}, {author:"filo", text:"great post man"}], category: "Walks"}).save();


        if( req.query.category) {
            const posts = await WallMessage.find({category: req.query.category});
            if(posts && posts.length > 0) {
                res.status(200).send(posts);
            } else {
                res.status(400).send({message: "Nothing to see here"});
            }
        } else {
            const posts = await WallMessage.find({});
            if(posts && posts.length > 0) {
                res.status(200).send(posts);
            } else {
                res.status(400).send({message: "Nothing to show here"});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});

router.get('/',  async (req, res) => {
    try {
        const posts = await WallMessage.find({});
       
        if(posts && posts.length > 0) {
            res.send(posts);
        } else {
            res.status(400).send({message: "Nothing to show here"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.post('/posts', upload.single('photo'), async (req, res) => {
    try {
        const wm = new WallMessage();
        wm.image.data = fs.readFileSync('uploads/' + req.file.filename);
        wm.image.contentType = "image/png";
        wm.author = req.body.author;
        wm.body = req.body.body;

        const doc = await wm.save();
        if(doc) {
            res.status(201).send({message: "posted!"});
        } else {
            res.status(400).send({message: "Some error occured, please try again"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.get("/:userId", async (req, res) => {
    try {
        
        if(req.params.userId) {
            const userWallMessages = await WallMessage.find({author: req.params.userId});
            if(userWallMessages && userWallMessages.length > 0) {
                res.status(200).send(userWallMessages);
            } else {
                res.status(400).send({message: "Nothing to show here"});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.post("/:wallId", async (req, res) => {
    try {
        const wm = await WallMessage.findById(req.params.wallId);
        const prevComments = wm.comments;
        const newComment = {
            author: req.body.author,
            text: req.body.comment
        };
        prevComments.push(newComment);
        const doc = await wm.updateOne({comments: prevComments});
        if(doc.modifiedCount > 0) {
            res.status(201).send({message: "Comment posted"});
        } else {
            res.status(400).send({message: "Some error occured"});   
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.delete("/:wallId", async (req, res) => {
    try {
        WallMessage.findByIdAndDelete(req.params.wallId, function (err, docs) {
            if(err) {
                res.status(400).send({message: "error deleting"})
                console.log(err);
            } else {
                res.status(200).send({message: "Wall message deleted"});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

module.exports = router; 