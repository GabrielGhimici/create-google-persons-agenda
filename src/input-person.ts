class InputPerson {
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;
  private _email: string;
  private _group: number;
  constructor(inputData: string | Array<string>, groupIndex: number) {
    const data = inputData instanceof Array ? inputData : inputData.trim().split(',');
    while (data.length < 4) {
      data.push('');
    }
    const [firsName, lastName, phone, email] = data;
    this._firstName = firsName;
    this._lastName = lastName;
    this._phoneNumber = phone;
    this._email = email;
    this._group = groupIndex;
  }

  public get firstName() {
    return this._firstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public get phoneNumber() {
    return this._phoneNumber;
  }

  public get email() {
    return this._email;
  }

  public get groupIndex() {
    return this._group;
  }

  public serialize(): Record<'firsName' | 'lastName' | 'phoneNumber' | 'email', string> {
    return {
      firsName: this._firstName,
      lastName: this._lastName,
      phoneNumber: this._phoneNumber,
      email: this._email,
    };
  }
}

export { InputPerson };
