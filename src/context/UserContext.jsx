import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useToast } from './ToastContext';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { showToast } = useToast();
  const [user, setUser] = useState({
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
    access: null,
    refresh: null,
    avatar: null,
  });
  const [errors, setErrors] = useState([]);

  const removeToken = () => {
    setUser({
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      access: null,
      refresh: null,
      avatar: null,
    });

    localStorage.removeItem('user.access');
    localStorage.removeItem('user.refresh');
    localStorage.removeItem('user.id');
    localStorage.removeItem('user.name');
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.avatar');
  };

  const refreshToken = refresh => {
    axios
      .post('/api/refresh/', { refresh })
      .then(response => {
        const newAccessToken = response.data.access;
        setUser(prevUser => ({
          ...prevUser,
          access: newAccessToken,
        }));

        localStorage.setItem('user.access', newAccessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      })
      .catch(error => {
        console.error('error', error);
        removeToken();
      });
  };

  const initStore = () => {
    const access = localStorage.getItem('user.access');
    const refresh = localStorage.getItem('user.refresh');
    const id = localStorage.getItem('user.id');
    const name = localStorage.getItem('user.name');
    const email = localStorage.getItem('user.email');
    const avatar = localStorage.getItem('user.avatar');

    if (access && refresh) {
      setUser({
        access,
        refresh,
        id,
        name,
        email,
        avatar,
        isAuthenticated: true,
      });
      refreshToken(refresh);
    }
  };

  useEffect(() => {
    initStore();
  }, []);

  const setToken = data => {
    setUser(prevUser => ({
      ...prevUser,
      access: data.access,
      refresh: data.refresh,
      isAuthenticated: true,
    }));

    localStorage.setItem('user.access', data.access);
    localStorage.setItem('user.refresh', data.refresh);
  };

  const setUserInfo = userInfo => {
    setUser(prevUser => ({
      ...prevUser,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar,
    }));

    localStorage.setItem('user.id', userInfo.id);
    localStorage.setItem('user.name', userInfo.name);
    localStorage.setItem('user.email', userInfo.email);
    localStorage.setItem('user.avatar', userInfo.avatar);
  };

  const signup = form => {
    const newErrors = [];

    if (!form.name) newErrors.push('Name is required');
    if (!form.email) newErrors.push('Email is required');
    if (!form.password1) newErrors.push('Password is required');
    if (form.password1 !== form.password2)
      newErrors.push('Passwords must match');

    setErrors(newErrors);

    if (newErrors.length === 0) {
      axios
        .post('/api/signup/', form)
        .then(response => {
          if (response.data.message === 'success') {
            showToast(
              5000,
              'The user is registered. Please log in',
              'bg-emerald-500'
            );
          } else {
            const data = JSON.parse(response.data.message);
            Object.keys(data).forEach(key => {
              setErrors(prevErrors => [...prevErrors, data[key][0].message]);
            });
            showToast(
              5000,
              'Something went wrong. Please try again',
              'bg-red-500'
            );
          }
        })
        .catch(error => {
          console.error('error', error);
        });
    }
  };

  const submitForm = (form, fileRef) => {
    setErrors([]);
    const newErrors = [];

    if (form.email === '') {
      newErrors.push('Your e-mail is missing');
    }

    if (form.name === '') {
      newErrors.push('Your name is missing');
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      showToast(5000, 'Please fix the errors and try again.', 'bg-red-500');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', fileRef.current.files[0]);
    formData.append('name', form.name);
    formData.append('email', form.email);

    axios
      .post('/api/editprofile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.message === 'information updated') {
          showToast(5000, 'Profile has been updated', 'bg-emerald-500');

          setUserInfo({
            id: user.id,
            name: form.name,
            email: form.email,
            avatar: response.data.user.get_avatar,
          });

          window.history.back();
        } else {
          showToast(
            5000,
            `${response.data.message}. Please try again`,
            'bg-red-500'
          );
        }
      })
      .catch(error => {
        console.error('error', error);
        showToast(5000, 'An error occurred. Please try again.', 'bg-red-500');
      });
  };

  const login = async form => {
    const newErrors = [];
    if (!form.email) newErrors.push('Email is required');
    if (!form.password) newErrors.push('Password is required');

    setErrors(newErrors);
    if (newErrors.length === 0) {
      try {
        const response = await axios.post('/api/login/', form);
        setToken(response.data);

        const userResponse = await axios.get('/api/me/', {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        });
        setUserInfo(userResponse.data);
        return { success: true };
      } catch (error) {
        console.error('error', error);
        setErrors([
          'The email or password is incorrect! Or the user is not activated!',
        ]);
        return { success: false };
      }
    } else {
      return { success: false };
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      setToken,
      removeToken,
      setUserInfo,
      initStore,
      errors,
      login,
      signup,
      submitForm,
      setErrors,
    }),
    [user, errors]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
