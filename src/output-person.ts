import { ENDING_ROOT, HEADER } from './consts';
import { InputPerson } from './input-person';

class OutputPerson {
  private _name: string = '';
  private _givenName: string = '';
  private _additionalName: string = '';
  private _familyName: string = '';
  private _yomiName: string = '';
  private _givenNameYomi: string = '';
  private _additionalNameYomi: string = '';
  private _familyNameYomi: string = '';
  private _namePrefix: string = '';
  private _nameSuffix: string = '';
  private _initials: string = '';
  private _nickname: string = '';
  private _shortName: string = '';
  private _maidenName: string = '';
  private _birthday: string = '';
  private _gender: string = '';
  private _location: string = '';
  private _billingInformation: string = '';
  private _directoryServer: string = '';
  private _mileage: string = '';
  private _occupation: string = '';
  private _hobby: string = '';
  private _sensitivity: string = '';
  private _priority: string = '';
  private _subject: string = '';
  private _notes: string = '';
  private _language: string = '';
  private _photo: string = '';
  private _groupMembership: string = '';
  private _phone1Type: string = '';
  private _phone1Value: string = '';
  private _phone2Type: string = '';
  private _phone2Value: string = '';
  private _organization1Type: string = '';
  private _organization1Name: string = '';
  private _organization1YomiName: string = '';
  private _organization1Title: string = '';
  private _organization1Department: string = '';
  private _organization1Symbol: string = '';
  private _organization1Location: string = '';
  private _organization1JobDescription: string = '';
  private _keys: Array<string>;
  constructor() {
    this._keys = HEADER.split(',').map((item) => {
      const splittedItem = item.split(' ');
      const result = splittedItem.reduce((acc, value, index) => {
        if (index === 0) {
          return `${acc}${value.toLowerCase()}`;
        }
        if (value === '-') return acc;
        return `${acc}${value}`;
      }, '');
      return result;
    });
  }

  public applyInputPerson(person: InputPerson) {
    const ending = person.groupIndex !== -1 ? `${ENDING_ROOT}_${person.groupIndex}` : ENDING_ROOT;
    this._name = `${person.firstName} ${person.lastName} ${ending}`;
    this._givenName = person.firstName;
    this._familyName = `${person.lastName} ${ending}`;
    this._groupMembership = '* myContacts';
    this._phone1Type = 'Mobile';
    this._phone1Value = person.phoneNumber;
    return this;
  }

  private serializeObject(): Record<string, string> {
    return this._keys.reduce((accumulator: Record<string, string>, key) => {
      accumulator[key] = this[`_${key}` as keyof OutputPerson] as unknown as string;
      return accumulator;
    }, {});
  }

  public serializeString(): string {
    const dataObject = this.serializeObject();
    return this._keys
      .map((key) => {
        return dataObject[key];
      })
      .join(',');
  }
}

export { OutputPerson };
