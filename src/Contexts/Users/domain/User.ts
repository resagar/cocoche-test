export class User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly createdAt: Date;

  constructor({
    id,
    name,
    phone,
    email,
    createdAt
  }: {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.createdAt = createdAt;
  }
}
