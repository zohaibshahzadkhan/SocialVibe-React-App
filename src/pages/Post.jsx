import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedItem from '../components/FeedItem';
import CommentItem from '../components/CommentItem';
import { usePosts } from '../context/PostsContext';
import { useUser } from '../context/UserContext';

function Post() {
  const { post, getPost, submitPostForm, body, setBody } = usePosts();
  const { user } = useUser();
  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    getPost(postId);
  }, []);

  const deletePost = id => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-center col-span-4 space-y-4">
        {post.id && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <FeedItem post={post} onDeletePost={deletePost} />
          </div>
        )}

        {post.comments.map(comment => (
          <div
            key={comment.id}
            className="p-4 ml-6 bg-white border border-gray-200 rounded-lg"
          >
            <CommentItem comment={comment} />
          </div>
        ))}

        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={submitPostForm(postId)}>
            <div className="p-4">
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                className="p-4 w-full bg-gray-100 rounded-lg"
                placeholder="What do you think?"
              />
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                type="submit"
                className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
