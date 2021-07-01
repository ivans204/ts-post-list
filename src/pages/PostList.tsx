import { useState, useContext, FC, ChangeEvent } from 'react';

import { IComment } from '../models/comment.model';
import { IUser } from '../models/user.model';
import { IPost } from '../models/post.model';

import withMessage from '../hocs/withMessage';

import { PostContext } from '../context/PostsContext';
import PostItem from 'components/PostItem';

const PostList: FC = () => {
    const { posts, users, postAuthor, postComments } = useContext(PostContext);

    const [searchValue, setSearchValue] = useState<string>('');

    const filteredUsers: IUser[] = users.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredData: IPost[] = posts.filter((post) => {
        if (!searchValue) return post;
        return filteredUsers.find((user) => post.userId === user.id);
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(e.target.value.trim());

    let author: IUser = {} as IUser;
    let comments: IComment[] = [];

    return (
        <div>
            <label htmlFor="search">
                Search
                <input type="text" name="search" onChange={handleSearch} />
            </label>

            {posts.length &&
                filteredData.map(({ id, title, body, userId }) => {
                    author = postAuthor(userId);
                    comments = postComments(id);

                    return (
                        !!author &&
                        !!comments.length && (
                            <PostItem
                                key={id}
                                title={title}
                                body={body}
                                author={author.username}
                                comments={comments}
                                href={`/post/${id}`}
                            />
                        )
                    );
                })}
        </div>
    );
};

export default withMessage(PostList, 'PostList');
