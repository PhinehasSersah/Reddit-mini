import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import './CommentsPage.css';

import {
  fetchComments,
  selectSelectedPostId,
  selectComments,
  selectCommentsStatus,
  selectCommentsError,
} from './commentsPageSlice';
import { selectSelectedPost } from './commentsPageSlice';

import { numberFormat } from '../../utils/numberFormat';
import Comment from '../Comment/Comment';

const CommentsPage = () => {
  const postId = useSelector(selectSelectedPostId);
  const post = useSelector(selectSelectedPost);
  const comments = useSelector(selectComments);
  const status = useSelector(selectCommentsStatus);
  const error = useSelector(selectCommentsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  let content;

  if (status === 'loading') {
    content = <h4 style={{ margin: '3rem' }}>Loading comments...</h4>;
  } else if (status === 'succeeded') {
    content = (
      <div className='regular-box'>
        <div className='post-comments-info'>
          <Link to={`/${post.subreddit_name_prefixed}`}>
            <small>{post.subreddit_name_prefixed}</small>
          </Link>
          <small>Posted by {post.author}</small>
          <small>{moment.unix(post.created_utc).fromNow()}</small>
          <small>Votes: {numberFormat(post.score)}</small>
        </div>

        <div className='post-comments-header'>
          <h2>{post.title}</h2>
          {post.selftext && <ReactMarkdown children={post.selftext} />}
          <hr />
          {post.is_video && (
            <video
              src={post.media.reddit_video.fallback_url}
              controls
              loop={true}
              preload='auto'
              className='post-media'
            />
          )}

          {post.url_overridden_by_dest && (
            <img
              src={post.url_overridden_by_dest}
              alt=''
              className='post-media'
            />
          )}
        </div>

        <ul className='root-comment'>
          {comments.map((comment) => {
            return <Comment comment={comment} key={comment.id} />;
          })}
        </ul>
      </div>
    );
  } else if (status === 'failed') {
    content = <h4 style={{ margin: '3rem' }}>{error}</h4>;
  }

  return <>{content}</>;
};

export default CommentsPage;
