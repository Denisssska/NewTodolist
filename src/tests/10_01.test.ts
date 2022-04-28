import {
    addNewBook, AType, changeName,
    companies,
    hairDresser,
    lastCompany,
    moveUser,
    upgrateUserLaptop,
    UserType,
    UserTypeTwo
} from "./10_01";
 test('primer',()=>{
    let user:UserType ={
        name:'denis',
        hair:32,
        adress:{city:'minsk'},

    }
    let proba = hairDresser(user,2)
    expect(proba.hair).toBe(16)

})

test('change adress',()=>{

    let user:UserType ={
        name:'denis',
        hair:32,
        adress:{city:'minsk',
        house:12},
        laptop:{title:'zenbook'}
    }
    const movedUser = moveUser(user,'kiev')

    expect(user).not.toBe(movedUser)
    expect(user.adress).not.toBe(movedUser.adress)
    expect(movedUser.adress.city).toBe('kiev')
    expect(movedUser.adress.city).not.toBe(user.adress.city)
    expect(user.laptop).toBe(movedUser.laptop)
})
test('upgradeUserLapTop',()=>{

    let user:UserType ={
        name:'denis',
        hair:32,
        adress:{city:'minsk',
        house:12},
        laptop:{title:'zenbook'}
    }
    const upgrateUser = upgrateUserLaptop(user,'book')

    expect(user).not.toBe(upgrateUser)
    expect(user.adress).toBe(upgrateUser.adress)
    expect(user.laptop).not.toBe(upgrateUser.laptop)
    expect(upgrateUser.laptop.title).toBe('book')
    expect(upgrateUser.laptop.title).not.toBe(user.laptop?.title)
    expect(upgrateUser.laptop.title).not.toBe(user.laptop?.title)

})
test('addNewBook',()=>{

    let user:UserTypeTwo ={
        name:'denis',
        hair:32,
        adress:{city:'minsk',
        house:12},
        laptop:{title:'zenbook'},
        books:['css','html','js'],
        companies:[{id:1, title:'EPAM'},{id:2, title:'school'}]
    }
    const NewBook = addNewBook(user,'ts')

    expect(user).not.toBe(NewBook)
    expect(user.adress).toBe(NewBook.adress)
    expect(user.books).not.toBe(NewBook.books)
    expect(user.books.length).toBe(3)
    expect(NewBook.books.length).toBe(4)

    expect(NewBook.books[3]).toBe('ts')

})
test('companies',()=>{

    let user:UserTypeTwo ={
        name:'denis',
        hair:32,
        adress:{city:'minsk',
        house:12},
        laptop:{title:'zenbook'},
        books:['css','html','js'],
        companies:[{id:1, title:'EPAM'},{id:2, title:'school'}]

    }
    const company = companies(user,1,'epam')

    expect(user).not.toBe(company)
    expect(user.adress).toBe(company.adress)
    expect(user.companies).not.toBe(company.companies)
    expect(company.companies[0].title).toBe('epam')

})
test('update company',()=>{
    let companiesss ={
        'dima':[{id:1, title:'EPAM'},{id:2, title:'school'}],
        'kolya':[{id:2, title:'school'}]
    }

   const copy = lastCompany(companiesss,'dima',1,'epam')
expect(copy['dima']).not.toBe(companiesss['dima'])
expect(copy['kolya']).toBe(companiesss['kolya'])
expect(copy['dima'][0].title).toBe('epam')

})

test('deep',()=>{
    let a:AType ={
        name:'it',
        protocol:10,
        students:['ivan','sanya','farid'],
        classroom:{
            teather:{
                name:'asya',
                age:18
            }
        }
    }
    const copy = changeName(a,'kolya',18)
    expect(copy).not.toBe(a)
    expect(copy.protocol).not.toBe(a.protocol)
    expect(copy.students[3]).toBe('kolya')
    expect(copy.classroom.teather.name).toBe('kolya')
    expect(copy.classroom.teather.name).not.toBe(a.classroom.teather.name)
    expect(copy.classroom.teather).not.toBe(a.classroom.teather)
    expect(copy.classroom.teather.age).toBe(18)
    expect(copy.classroom.teather.age).toBe(a.classroom.teather.age)
})