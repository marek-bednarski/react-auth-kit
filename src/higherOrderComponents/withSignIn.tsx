/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview SignIn component
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */
import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';
import {signInFunctionParams} from '../types';

/**
 * @interface withSignInProps
 */
interface withSignInProps {
    signIn(params: signInFunctionParams): boolean
}

/**
 * @public
 * @function
 * @name withSignIn
 * @description Inject sign in functionality inside the Component's Prop
 * @param Component
 */
function withSignIn<P extends withSignInProps>(
    Component: React.ComponentType<P>,
):React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          const signIn = (signInConfig: signInFunctionParams)
            : boolean => {
            const {token, tokenType, authState, expiresIn} = signInConfig;
            const expTime = new
            Date(new Date().getTime() + expiresIn * 60 * 1000);
            try {
              if (c) {
                c.setAuthState((prevState) => ({
                  ...prevState,
                  authToken: token,
                  authTokenType: tokenType,
                  expireAt: expTime,
                  authState: authState,
                }));
                return true;
              } else {
                return false;
              }
            } catch (e) {
              console.error(e);
              return false;
            }
          };
          return <Component {...props} signIn={signIn}/>;
        }}
      </AuthContextConsumer>
    );
  };
}

/**
 * @exports withSignIn
 */
export default withSignIn;
