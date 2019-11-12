import { deserialize, serializable } from "serializr";

import { observable, action } from "mobx";

export class Person {
  @serializable @observable personId: number;
  @serializable @observable firstName: string;
  @serializable @observable middleName: string;
  @serializable @observable lastName: string;
}

export class PersonStore {
  @observable pendingRequestCount = 0;
  @observable people: Person[] = [];
  api;
  constructor(api) {
    this.api = api;
    console.warn("PersonStore constructor disabled");
    // this.loadPeople();
  }

  @action create(person: Person) {
    this.api.person.create(person).then(res => {
      this.updateFromServer(res);
    });
  }

  @action delete(id: number) {
    this.api.person.del(id).then(
      action(() => {
        this.people.splice(this.people.findIndex((x: Person) => x.personId === id), 1);
      })
    );
  }

  @action loadPeople() {
    this.api.person.find().then((res: Person[]) => res.forEach(json => this.updateFromServer(json)));
  }

  @action updateFromServer(json) {
    let todo = this.people.find(todo => todo.personId === json.personId);
    if (!todo) {
      todo = deserialize(Person, json);
      this.people.push(todo);
    }
  }

  getPeople() {
    return this.people.slice();
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
