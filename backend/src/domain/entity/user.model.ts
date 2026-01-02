export interface UnlogedUser {
  id: string;
  username: string;
  email: string;
}

export interface LogedUser {
  email: string;
  password: string;
}

export class User {
  private _id: string = "";
  private _username: string = "";
  private _email: string = "";
  private _password: string = "";

  constructor(user: any) {
    if ( typeof user  ) {
      this._id = user?.id;
      this._username = user?.username;
      this._email = user?.email;
    }
    if (user.password) {
      this._email = user?.email;
      this._password = user?.password;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }
}
