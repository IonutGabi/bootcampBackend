interface Student {
  name: string;
  age: number;
  occupation: string;
}
interface Teacher {
  name: string;
  age: number;
  subject: string;
}

type Person = Student | Teacher;

const users: Person[] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Jane Doe",
    age: 41,
    subject: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    subject: "Biology",
  },
];

const IsStudent = (person: Person): person is Student => "occupation" in person;
const isTeacher = (person: Person): person is Teacher => "subject" in person;

const logPerson = (user: Person) => {
  let extraInfo: string = "";

  if (IsStudent(user)) {
    extraInfo = user.occupation;
  } else if (isTeacher(user)) {
    extraInfo = user.subject;
  }
  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

users.forEach(logPerson);
