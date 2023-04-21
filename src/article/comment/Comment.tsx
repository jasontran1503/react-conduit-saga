import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { NewComment } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import { formatDate } from 'shared/data-access/common/logic/formatDate';
import { commentActions, selectCommentsBySlug, selectCommentsStatus } from './commentSlice';

const Comment = ({ slug }: { slug: string | undefined }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectCommentsBySlug);
  const currentUser = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting }
  } = useForm<NewComment>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<NewComment> = (comment) => {
    if (slug) {
      dispatch(commentActions.createCommentBegin({ slug, comment }));
      reset();
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchComments = () => {
      if (!ignore) {
        if (slug) dispatch(commentActions.getCommentsBegin(slug));
      }
    };

    fetchComments();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const onDeleteComment = (id: number) => {
    if (slug) dispatch(commentActions.deleteCommentBegin({ slug, id }));
  };

  return (
    <>
      <form className="card comment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            {...register('body', { required: true })}
          ></textarea>
        </div>
        <div className="card-footer">
          <img src={currentUser?.image} className="comment-author-img" />
          <button className="btn btn-sm btn-primary" disabled={!isValid || isSubmitting}>
            Post Comment
          </button>
        </div>
      </form>

      {comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <div className="card" key={comment.id}>
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                  <img src={comment.author.image} className="comment-author-img" />
                </Link>
                &nbsp;
                <Link to={`/profile/${comment.author.username}`} className="comment-author">
                  {comment.author.username}
                </Link>
                <span className="date-posted">{formatDate(new Date(comment.createdAt))}</span>
                {comment.author.username === currentUser?.username && (
                  <span className="mod-options">
                    <i className="ion-trash-a" onClick={() => onDeleteComment(comment.id)}></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
