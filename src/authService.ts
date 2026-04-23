class AccessTokenStorage {
  private _value: string | null = null;

  set value(token: string | null) {
    this._value = token;
  }

  get value(): string | null {
    return this._value;
  }

  clear() {
    this._value = null;
  }
}

export const accessToken = new AccessTokenStorage();
