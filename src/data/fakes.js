import { faker } from "@faker-js/faker";

export const ArrayPacientes = Array.from({ length:20 }).map(() => {
    return {
        id: faker.number.int({ min: 10000, max: 20000 }),
        name: faker.person.fullName(),
        cpf: faker.phone.number('###.###.###-##'),
        telefone: faker.phone.number('(11) 9####-####'),
        nascimento: '15/06/2005'
    }
})