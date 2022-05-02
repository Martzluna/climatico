import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { facebook, google } from "../../utils/firebaseConfig";


export const logoutAsync = () => async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch({
        type: 'LOGOUT',
    })
}

export const loginGoogle = () => async (dispatch) => {
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, google)
    console.log('user >>> ', user)
    dispatch(handleLoginAction(user.email, user.uid))
}

export const loginFacebook = () => async (dispatch) => {
    const auth = getAuth();
    const { user } = signInWithPopup(auth, facebook)
    dispatch(handleLoginAction(user.email, user.uid))
}

export const loginWithEmailPassAsync = (email, password) => async (dispatch) => {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    dispatch(handleLoginAction(user.email, user.uid))
}

export const registerUser = ({email, password, userName}) => async (dispatch) => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: userName })
    dispatch(handleLoginAction(user.email, user.uid))
}

const handleLoginAction = (email, id) => ({
    type: 'LOGIN',
    payload: {
        email,
        id
    }
})

export const validAuth = (email, id) => ({
    type: 'VALID_AUTH',
    payload: {
        email,
        id
    }
})