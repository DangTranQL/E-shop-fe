import { createContext, useReducer, useEffect } from 'react';
import apiService from '../app/apiService';
import { isValid } from '../utils/jwt';
import { useLocation, useNavigate } from 'react-router-dom';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
}

const INITIALIZED = 'AUTH.INITIALIZED';
const LOGIN_SUCCESS = 'AUTH.LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'AUTH.REGISTER_SUCCESS';
const LOGOUT = 'AUTH.LOGOUT';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZED:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,

        isAuthenticated: true,
        user: action.payload.newUser,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext({...initialState});

const setSession = (accessToken) => { 
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete apiService.defaults.headers.common.Authorization;
  }
}

function AuthProvider({ children }) {
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && isValid(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get('/user/me');
          const user = response.data.data;
          dispatch({ type: INITIALIZED, payload: { isAuthenticated: true, user } });
        }
        else {
          setSession(null);
          dispatch({ type: INITIALIZED, payload: { isAuthenticated: false, user: null } });
        }
      } catch (error) {
        setSession(null);
        dispatch({ type: INITIALIZED, payload: { isAuthenticated: false, user: null }});
      }
    }
    initialize();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async ({email, password}, callback) => {
    const response = await apiService.post('/login', {email, password});
    const { user, accessToken } = response.data.data;
    const from = location.state?.from?.pathname || "/" ;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    if (user.role === "buyer") {
      navigate(from, { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  const register = async ({username, email, password, role, address, phone}, callback) => {
    const response = await apiService.post('/user', {username, email, password, role, address, phone});
    const { newUser, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { newUser },
    });

    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{...state, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
