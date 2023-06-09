import { CreatePostPage } from 'pages/CreatePost';
import { PostPage } from 'pages/Post';
import { PostsPage } from 'pages/Posts';
import { UpdatePostPage } from 'pages/UpdatePost';
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { routePaths } from './routes';
import { ProfilePage } from 'pages/Profile';

export const router = [
  {
    path: routePaths.HOME,
    component: <HomePage />,
  },
  {
    path: routePaths.REGISTER,
    component: <RegisterPage />,
  },
  {
    path: routePaths.LOGIN,
    component: <LoginPage />,
  },
  {
    path: routePaths.POSTS,
    component: <PostsPage />,
  },
  {
    path: routePaths.CREATE_POST,
    isProtected: true,
    component: <CreatePostPage />,
  },
  {
    path: routePaths.POST,
    component: <PostPage />,
  },
  {
    path: routePaths.EDIT_POST,
    isProtected: true,
    component: <UpdatePostPage />,
  },
  {
    path: routePaths.PROFILE,
    isProtected: true,
    component: <ProfilePage />,
  },
];
