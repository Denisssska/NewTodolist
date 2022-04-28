export type UserType = {
    name: string
    hair: number
    adress: { city: string, house?: number }
    laptop?: { title: string }
    books?: Array<string>
    companies?: Array<{ id: number, title: string }>
}
export type UserTypeTwo = {
    name: string
    hair: number
    adress: { city: string, house?: number }
    laptop: { title: string }
    books: Array<string>
    companies: Array<{ id: number, title: string }>
}
export type CompanyType={id:number,title:string}

export const hairDresser = (u: UserType, power: number) => {
    const copy = {...u}
    copy.hair = u.hair / power
    return copy
}
export const moveUser = (u: UserType, city: string) => {
    const copy = {
        ...u, adress: {...u.adress, city: city}
    }

    return copy
}
export const upgrateUserLaptop = (u: UserType, title: string) => {
    const copy = {
        ...u, laptop: {...u.laptop, title: title}
    }
    return copy
}
export const addNewBook = (u: UserTypeTwo, book: string) => {
    const copy3 = {
        ...u, books: [...u.books, book]
    }
    return copy3
}
// books.concat(books)

export const companies = (u: UserTypeTwo, id: number, company: string) => {
    const copy4 = {
        ...u, companies: u.companies.map(c => c.id === id ? {...c, title: company}:c)
    }
    return copy4
}
export const  lastCompany=(companiesss:{[key:string]:Array<CompanyType>},userName:string,id:number,newTitle:string)=>{
let companiesssCopy ={...companiesss};
    companiesssCopy[userName]=companiesssCopy[userName].map(c=>c.id===id?
        {...c,title:newTitle}:c)
    return companiesssCopy
}
type TeatherType={
    name:string
    age:number
}
export type AType={
    name:string
    protocol:number
    students:Array<string>
    classroom:{teather:TeatherType}
}
export const changeName =(a:AType,name:string,age:number)=>{
    let copy={
        ...a,
        protocol:age,
        students: [...a.students,name],
        classroom: {...a.classroom,
    teather:{...a.classroom.teather,
        name:name,
        age:age
    }}
    }
    return copy
}