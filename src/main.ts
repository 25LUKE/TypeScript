//Class object
class Coder {

    secondLang!: string

    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = 'Typescript' // default value
    ) {
        this.name = name
        this.music = music
        this.age = age
        this.lang = lang
    }

    public getAge() {
        return `Hello, I'm ${this.age}`
    }
}

const Dave = new Coder('Dave', 'Rock', 42)
console.log(Dave.getAge())
// console.log(Dave.age)
// console.log(Dave.lang)

class WebDev extends Coder {
    constructor(
        public computer: string,
        name: string,
        music: string,
        age: number,
    ) {
        super(name, music, age)
        this.computer = computer
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25)
console.log(Sara.getLang())
// console.log(Sara.age) 
// console.log(Sara.lang)
/////////////////////////////////////

interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}

class Guitarist implements Musician {
    name: string
    instrument: string

    constructor(name: string, instrument: string) {
        this.name = name
        this.instrument = instrument
    }

    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`
    }
}

const Page = new Guitarist('Jimmy', 'guitar')
console.log(Page.play('strums'))
//////////////////////////////////////

class Peeps {
    static count: number = 0

    static getCount(): number {
        return Peeps.count
    }

    public id: number

    constructor(public name: string) {
        this.name = name
        this.id = ++Peeps.count
    }
}

const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy')

console.log(Amy.id)
console.log(Steve.id)
console.log(John.id)
console.log(Peeps.count)
//////////////////////////////////

class Bands {
    private dataState: string[]

    constructor() {
        this.dataState = []
    }

    public get data(): string[] {
        return this.dataState
    }

    public set data(value: string[]) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value
            return
        } else throw new Error('Param is not an array of strings')
    }
}

const MyBands = new Bands()
MyBands.data = ['Neil Young', 'Led Zep']
console.log(MyBands.data)
MyBands.data = [...MyBands.data, 'ZZ Top']
console.log(MyBands.data)
//MyBands.data = ['Van Halen', 5150] // most be string data

//optional parameters
const addAll = (c: number, d: number, e?: number): number => {
    if (typeof e !== 'undefined') {
        return c + d + e
    }
    return c + d
}

const sumAll = (c: number = 10, d: number, e: number = 2): number => {
    return c + d + e
}

console.log(addAll(2,3, 2))
console.log(sumAll(2, 3))
console.log(sumAll(undefined, 3))

//Literal type 
let myName: 'Dave'

let userName: 'Dave' | 'John' | 'Amy'
userName = 'Amy'

//Literal with a Functions
const add = (a: number, b: number): number => {
    return a + b
}

//Literal with an Arrow function
type mathFunction = (a: number, b: number) => number

let multiply: mathFunction = function (a,b) {
    return a * b
}

 const logMsg = (message: any): void => {
    console.log(message)
} 

logMsg('Hello!')
logMsg(add(3, 4))
 
//Literal with a Rest parameters
const total = (a: number, b: number,...nums: number[]): number => {
    return a + b + nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(10,2,2))

const createError = (errMsg: string) => {
    throw new Error(errMsg)
}

const infinite = () => {
    let i: number = 1
    while (true) {
        i++
        if (i > 100) break
    }
}

// custom type guard
const isNumber = (value: any): boolean =>{
    return typeof value === 'number'
        ? true : false
}

// use of the never type
const numberOrString = (value: number | string): string => {
    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    return createError('This should never happen!')
}

//Type Assertions
type one = string
type two = string | number
type three = 'Hello'

// convert to more or less specific
let a: one = 'Hello'
let b = a as two //less specific 
let c = a as three //more specific 

let d = <one> 'Wold'
let e = <string | number> 'world'

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string =>
 { 
   if (c === 'add') return a + b
   return '' + a + b
}

let myVal: string = addOrConcat(2,2, 'concat') as string

// Be careful! TS sees no problem - but a strimg is returned
let nextVal: number = addOrConcat(2,2, 'concat') as number

//10 as string 
(10 as unknown) as string

// The DOM Assertion
/* const img = document.querySelector('img')!
const myImg = document.getElementById('#img') as HTMLImageElement
const nextImg = <HTMLImageElement>document.getElementById('#img')

img.src
myImg.src
nextImg.src */
///////////////////////////////////////////////////////////////

//Index signatures

/* interface TransactionObj {
    [index: string]: number
} */
interface TransactionObj {
    [index: string]: number
    Pizza: number,
    Book: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Book: -5,
    Job: 50,
}

console.log(todaysTransactions.Pizza)
console.log(todaysTransactions['Pizza'])
 
//Index Dynamiclly Signature = without a loop
let prop: string = 'Pizza'
console.log(todaysTransactions[prop])

//Index Dynamiclly Signature = with a loop
const todaysNet = (transactions: TransactionObj): number => {
    let total = 0
    for (const transaction in transactions) {
        total += transactions[transaction]
    }
    return total
}

console.log(todaysNet(todaysTransactions))
///////////////////////////////////////////////////

interface Student {
    //[key: string]: string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: 'Doug',
    GPA: 3.5,
    classes: [100, 200]
}
//console.log(student.test)

for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => {
    console.log(student[key as keyof typeof student])
})

const logStudentKey = (student: Student, key: keyof Student) => {
    console.log(`Student ${key}, ${student[key]}`)
}
logStudentKey(student, 'name')
//////////////////////////////////////////////////////////////// 

/* interface Incomes {
    [key: string]: number
} */
type Streams = 'salary' | 'bonus' | 'sidehusle'

type InComes = Record<Streams, number | string>

const monthlyIncomes: InComes = {
    salary: 500,
    bonus: 100,
    sidehusle: 250
}
for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue as keyof InComes])
}
//////////////////////////////////////////////////////////////////////

//GENERIC
const echo = <T>(arg: T): T => arg
const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}
console.log(isObj(true))
console.log(isObj('John'))
console.log(isObj([1,2,3,4]))
console.log(isObj({ name: 'John'}))
console.log(isObj(null))

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T). length) {
        return { arg, is:false}
    }
    return { arg, is: !!arg}
}
console.log(isTrue(false))
console.log(isTrue(0))
console.log(isTrue(true))
console.log(isTrue(1))
console.log(isTrue('Dave'))
console.log(isTrue(''))
console.log(isTrue(null))
console.log(isTrue(undefined))
console.log(isTrue({})) //modified
console.log(isTrue({name: 'Dave'}))
console.log(isTrue([])) //modified
console.log(isTrue([1,2,3,4]))
console.log(isTrue(NaN))
console.log(isTrue(-0))
/////////////////////////////////////////////////////////

//generic signatue interface
interface BoolCheck<T> {
    value: T,
    is: boolean
} 
const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {
        return {value: arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T). length) {
        return {value: arg, is:false}
    }
    return {value: arg, is: !!arg}
}
///////////////////////////////////////////////////////////

interface HasId {
    id: number
}

const processUser = <T extends HasId>(user: T): T => {
    //process the user with logic here
    return user
}
console.log(processUser({ id:1, name: 'Dave'}))
//console.log(processUser({ name: 'Dave'}))
 
const getUsersProperty = <T extends HasId, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map( user => user[key])
} 


const usersArray = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
        }
    },
]
console.log(getUsersProperty(usersArray, "email"))

//generic signatue in a class
class StateObject<T> {
    private data: T

    
constructor(value: T) {
    this.data = value
}

get state(): T {
    return this.data
}

set state(value: T) {
    this.data = value
}
}


const store = new StateObject("John")
console.log(store.state) 
store.state = "Dave"

const myState = new StateObject<(string | number | boolean)[]>([15])
myState.state = (['dave', 15, true])
console.log(myState.state)
//////////////////////////////////////////////////////////////////

//UTILITY TYPES = partial
interface Assignment {
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean
}
 const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>):
  Assignment => {
    return { ...assign, ...propsToUpdate}
  }

  const assign1: Assignment = {
    studentId: "compsci123",
    title: "Final Project",
    grade: 0,
  }

  console.log(updateAssignment(assign1,{ grade: 95 }))
  const assignGraded : Assignment = updateAssignment( assign1, { grade: 95})
  ////////////////////////////////////////////////////////////////////

  //UTILITY TYPES = Required and readOnly
  const recordAssignment = ( assign: Required<Assignment>): Assignment => {
    //send to database, etc.
    return assign
  }
  const assignVerified: Readonly<Assignment> = { ...assignGraded , verified: true }

  recordAssignment({...assignGraded , verified: true})
//////////////////////////////////////////////////////////////////////

//UTILITY TYPES = Record
const hexColorMap: Record<string, string> = {
    red: "ff0000",
    green: "00ff00",
    blue: "0000ff",
}

type Students = "Sara" | "Kelvin"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

  const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelvin: "U"
  }
//interface
  interface Grades {
    assign1: number,
    assign2: number
  }

  const GradeData: Record<Students, Grades> = {
    Sara: { assign1: 85, assign2: 95 },
    Kelvin: { assign1: 94, assign2: 82 }

  }
  ////////////////////////////////////////////////////////////////////

//UTILITY TYPES = Pick and Omit
  type AssignResult = Pick<Assignment, 'studentId' | 'grade'>

  const score: AssignResult = {
    studentId: "K123",
    grade: 85
  }

  type AssignPreview = Omit<Assignment, "grade" | "verified" >

  const Preview: AssignPreview = {
    studentId: "K123",
    title: "Final Project"
  }
  ////////////////////////////////////////////////////////////////////

  //Exclude and Extract
  type adjustedGrades = Exclude<LetterGrades, "U">

  type highGrades = Extract<LetterGrades, "A" | "B" | "C">

  type AllPossibleGrades = "Dave" | "John" | "Null" | "Undefined"

  type NamesOnly = NonNullable<AllPossibleGrades>

// Return Type
  //type NewAssign = { title: string, point: number}

  const createNewAssign = ( title: string, point: number) => {
    return { title, point }
  }
  type NewAssign = ReturnType<typeof createNewAssign>

  const tsAssign: NewAssign = createNewAssign( "Utility types", 100)
  console.log(tsAssign)

  //parameters
  type AssignParams = Parameters<typeof createNewAssign>

  const assignargs: AssignParams = ["Generic", 2000]
  const tsAssign2: NewAssign = createNewAssign(...assignargs)

  console.log(tsAssign2)

  // Awaited = helps us with the ReturnType os a Promise
  interface User {
    id: number,
    name: string,
    username: string,
    email: string,
  }
  const fetchUsers = async (): Promise<User[]> => {

    const data = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then(res => {
        return res.json()
    }).catch(err => {
        if (err instanceof Error)
        console.log(err.message)
    })
    return data
  }

  type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>> 

  fetchUsers().then(users => console.log(users))