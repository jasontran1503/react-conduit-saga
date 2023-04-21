import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ArticleMeta from 'shared/data-ui/article-meta/ArticleMeta';
import Buttons from 'shared/data-ui/buttons/Buttons';
import { articleActions, selectArticleBySlug } from './articleSlice';
import Comment from './comment/Comment';

const Article = () => {
  const dispatch = useAppDispatch();
  const article = useAppSelector(selectArticleBySlug);
  const slug = useParams<{ slug: string }>().slug;

  useEffect(() => {
    let ignore = false;

    const fetchArticle = () => {
      if (!ignore) {
        if (slug) dispatch(articleActions.getArticleBySlugBegin(slug));
      }
    };

    fetchArticle();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const onDeleteArticle = (slug: string) => {
    dispatch(articleActions.deleteArticleBegin(slug));
  };

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>

              <ArticleMeta article={article}>
                <Buttons article={article} onDeleteArticle={onDeleteArticle} />
              </ArticleMeta>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <ArticleMeta article={article}>
                <Buttons article={article} onDeleteArticle={onDeleteArticle} />
              </ArticleMeta>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <Comment slug={slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
