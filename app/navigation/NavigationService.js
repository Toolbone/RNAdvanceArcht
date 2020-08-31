import * as React from 'react';

export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function reset(name, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

export default {
  navigate,
  reset,
  goBack,
};
