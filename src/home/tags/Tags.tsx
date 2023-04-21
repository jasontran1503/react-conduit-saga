import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import { selectTags, selectTagsStatus, tagsActions } from './tagsSlice';

export const Tags = ({ onSelectTag }: { onSelectTag: Function }) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);
  const status = useAppSelector(selectTagsStatus);

  useEffect(() => {
    let ignore = false;

    const fetchTags = () => {
      if (!ignore) dispatch(tagsActions.begin());
    };

    fetchTags();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="tag-list">
      {status === 'loading' && 'Loading tags...'}
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <a key={index} className="tag-pill tag-default" onClick={() => onSelectTag(tag)}>
            {tag}
          </a>
        ))}
    </div>
  );
};
