import { IUserRepository } from '@/user/repositories/IUserRepository'
import { range } from 'lodash-es'
import { faker } from '@faker-js/faker'

export const generateUsers = async (amount: number, userRepository: IUserRepository) => {
  range(amount).forEach(() => {
    userRepository.addUser(faker.internet.userName(), faker.location.country())
  })
}
