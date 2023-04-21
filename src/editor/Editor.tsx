import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { NewArticle, UpdateArticle } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import { editorActions, selectEditorArticleBySlug, selectEditorErrors } from './editorSlice';

const Editor = () => {
  const dispatch = useAppDispatch();
  const slug = useParams<{ slug: string }>().slug;

  const article = useAppSelector(selectEditorArticleBySlug);
  const errors = useAppSelector(selectEditorErrors);
  const currentUsername = useAppSelector(selectCurrentUser)?.username;
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting }
  } = useForm<NewArticle | UpdateArticle>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<NewArticle | UpdateArticle> = (data) => {
    setValue('tagList', tags);
    const value = { ...data, tagList: tags };
    if (!slug) {
      dispatch(editorActions.createArticleBegin(value as NewArticle));
      return;
    }
    dispatch(editorActions.updateArticleBegin({ slug, article: value as UpdateArticle }));
  };

  useEffect(() => {
    let ignore = false;

    const fetchArticle = () => {
      if (!ignore) {
        if (slug) dispatch(editorActions.getArticleBySlugBegin(slug));
      }
    };

    fetchArticle();

    return () => {
      ignore = true;
    };
  }, [slug]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (article && article.author.username === currentUsername) {
        setValue('title', article.title);
        setValue('body', article.body);
        setValue('description', article.description);
        setValue('tagList', article.tagList);
        setTags(article.tagList);
        return;
      }
    }

    return () => {
      ignore = true;
    };
  }, [article, isValid]);

  useEffect(() => {
    return () => {
      dispatch(editorActions.resetError());
    };
  }, []);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value.trim();

    if (inputValue) {
      setTags([...tags, inputValue]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const deleteTag = (tagRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagRemove);
    setTags(newTags);
    setValue('tagList', newTags);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorsForm errors={errors} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    {...register('title', { required: true })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    {...register('description', { required: true })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    {...register('body', { required: true })}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e);
                      }
                    }}
                  />
                  {tags.length > 0 && (
                    <div className="tag-list">
                      {tags.map((tag, index) => (
                        <span key={index} className="tag-pill tag-default">
                          <i className="ion-close-round" onClick={() => deleteTag(tag)}></i>
                          {' ' + tag}
                        </span>
                      ))}
                    </div>
                  )}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid || isSubmitting}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
