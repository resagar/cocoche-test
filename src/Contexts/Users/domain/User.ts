export class User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;

  constructor({ id, name, phone, email }: { id: string; name: string; phone: string; email: string }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}
