import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
  const [toast, setToast] = useState(null);

  const initStoreCalled = useRef(false);

  useEffect(() => {
    if (!initStoreCalled.current) {
      initStore();
      initStoreCalled.current = true;
    }
  }, []);

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

  const setToken = (data) => {
    setUser((prevUser) => ({
      ...prevUser,
      access: data.access,
      refresh: data.refresh,
      isAuthenticated: true,
    }));

    localStorage.setItem('user.access', data.access);
    localStorage.setItem('user.refresh', data.refresh);
  };

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
  
  const setUserInfo = (userInfo) => {
    setUser((prevUser) => ({
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

  const refreshToken = (refresh) => {
    axios
      .post('/api/refresh/', { refresh })
      .then((response) => {
        const newAccessToken = response.data.access;
        setUser((prevUser) => ({
          ...prevUser,
          access: newAccessToken,
        }));

        localStorage.setItem('user.access', newAccessToken);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + newAccessToken;
      })
      .catch((error) => {
        removeToken();
      });
  };

  const showToast = (duration, message, style) => {
    setToast({ duration, message, style });
    setTimeout(() => {
      setToast(null);
    }, duration);
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
      showToast(5000, 'Please fix the errors and try again.', 'bg-red-300');
      return;
    }

    let formData = new FormData();
    formData.append('avatar', fileRef.current.files[0]);
    formData.append('name', form.name);
    formData.append('email', form.email);

    axios
      .post('/api/editprofile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.message === 'information updated') {
          showToast(5000, 'The information was saved', 'bg-emerald-500');

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
            'bg-red-300'
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
        showToast(5000, 'An error occurred. Please try again.', 'bg-red-300');
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setToken,
        removeToken,
        setUserInfo,
        initStore,
        errors,
        toast,
        showToast,
        submitForm,
      }}
    >
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded ${toast.style}`}>
          {toast.message}
        </div>
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
