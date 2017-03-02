import {
    createModelSchema, primitive, reference, list, object, identifier, serialize, deserialize, getDefaultModelSchema,
    serializable
} from 'serializr';

import {observable, computed, autorunAsync, action, autorun} from 'mobx';


export class Person {
  @serializable @observable person_id: number;
	@serializable @observable first_name: string;
	@serializable @observable middle_name: string;
	@serializable @observable last_name: string;


	// constructor() {
		// this._saveHandle = autorunAsync(() => {
		// 	window.localStorage.setItem(STORAGE_PREFIX + this.person_id, JSON.stringify(serialize(this)));
		// }, 1000);
	// }

	@serializable @computed get displayName() {
		const cfl = capitalizeFirstLetter;
		return `${cfl(this.first_name)} ${cfl(this.last_name)}`;
	}

}

export class PersonStore {
	@observable pendingRequestCount = 0;
  @observable people: Person[] = [];
  api;
	constructor(api) {
    this.api = api;
    this.loadPeople();
	}

  @action create(person: Person) {
    this.api.person.create(person).then(res => {
      this.updateFromServer(res);
    });
  }

  @action delete(id: number) {
    this.api.person.del(id).then(action(() => {
      this.people.splice(this.people.findIndex((x: Person) => (x.person_id === id)),1)
      // this.people.remove(person);
    }));
  }

	@action	loadPeople() {
    this.api.person.find().then((res: Person[]) => res.forEach(json => this.updateFromServer(json)))
	}

  @action updateFromServer(json) {
      let todo = this.people.find(todo => todo.person_id === json.person_id);
      if (!todo) {
          todo = deserialize(Person, json)
          // todo = new Person(this, json.person_id, json.first_name, json.last_name);
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
