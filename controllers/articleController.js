import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  try {
    const body = req.body || {};

    const article = await Article.create({
      title: body.title,
      content: body.content,
      author: body.author,
      category: body.category,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("Create Article Error:", error);
    res.status(500).json({ message: error.message });
  }
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
    const body = req.body || {};

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (body.title) article.title = body.title;
    if (body.content) article.content = body.content;
    if (body.author) article.author = body.author;
    if (body.category) article.category = body.category;

    if (req.file) {
      article.image = req.file.filename;
    }

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error("Update Article Error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const deleteArticle = async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id);
    res.json({message: "Article Deleted Successfully"})
}