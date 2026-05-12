const createTokenStorage = () => {
  let _token: string | null = null;

  return {
    get value() {
      return _token;
    },

    set value(token: string | null) {
      _token = token;
    },

    clear() {
      _token = null;
    },
  };
};

export const accessToken = createTokenStorage();
