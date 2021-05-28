import React, { useCallback, useEffect } from "react";
import firebase from "../../config/firebase";
import { connect, useDispatch } from "react-redux";
import { restoreUser } from "../../modules/auth/duck";
import { transformUser } from "../../modules/auth/helpers";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const AuthModals = (props) => {
    const dispatch = useDispatch();
    const handleUser = useCallback((user) => {
        dispatch(restoreUser(transformUser(user)));
    }, []);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
        return () => unsubscribe();
    }, []);

    if (props.user) {
        return null;
    }
    if (props.showLoginModal) {
        return <LoginModal />;
    }
    if (props.showSignupModal) {
        return <SignupModal />;
    }
    return null;
};

const mapState = (state) => ({
    showLoginModal: state.auth.showLoginModal,
    showSignupModal: state.auth.showSignupModal,
    user: state.auth.user,
});

const connector = connect(mapState);

export default connector(AuthModals);
