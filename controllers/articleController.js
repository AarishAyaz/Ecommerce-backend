import Article from "../models/Article.js";

export const createArticle = async (req, res)=>{
    const article = await Article.create(req.body);
    res.status(201).json(article);
};

export const getArticles = async (req,res)=>{
    const articles = await Article.find().sort({createdAt: -1});
    res.json(articles)
}

export const getArticleById = async (req,res)=>{
    const article = await Article.findById(req.params.id);
    if(!article){
        return res.status(404).json({message:"Article not found"})
    }
    res.json(article);
}

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.image = req.body.image || article.image;
    article.author = req.body.author || article.author;

    const updatedArticle = await article.save();

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteArticle = async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id);
    res.json({message: "Article Deleted Successfully"})
}