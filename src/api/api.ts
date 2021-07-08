import axios, { AxiosResponse } from 'axios';

import { IComment } from '../models/comment.model';
import { IPost } from '../models/post.model';
import { IUser } from '../models/user.model';

const baseUrl: string = 'https://jsonplaceholder.typicode.com';

const responseBody = (response: AxiosResponse) => response.data;

export const getPosts = async (): Promise<IPost[]> =>
    await axios.get(`${baseUrl}/posts`).then(responseBody);

export const getComments = async (): Promise<IComment[]> =>
    await axios.get(`${baseUrl}/comments`).then(responseBody);

export const getUsers = async (): Promise<IUser[]> =>
    await axios.get(`${baseUrl}/users`).then(responseBody);

export const getPostById = async (id: number): Promise<IPost> =>
    await axios.get(`${baseUrl}/posts/${id}`).then(responseBody);

export const getUserByPostId = async (postId: number): Promise<IUser> =>
    await axios.get(`${baseUrl}/users/${postId}`).then(responseBody);

export const getCommentsById = async (id: number): Promise<IComment[]> =>
    await axios.get(`${baseUrl}/comments?postId=${id}`).then(responseBody);
