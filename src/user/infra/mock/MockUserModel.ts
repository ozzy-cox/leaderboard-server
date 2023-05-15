import { IUser } from '@/user/entities/IUser'

export class MockUserModel implements IUser {
  id: string
  username: string
  country: string
  //   get ranking(): number {}
  //   get money(): number {}

  constructor(id: string, username: string, country: string) {
    this.id = id
    this.username = username
    this.country = country
  }
}
