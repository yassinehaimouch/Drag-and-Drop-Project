// autobind
function Autobind(_target: any, _name: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescripor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescripor;
}

//class ProjectInput
class ProjectInput {
  templeteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templeteElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templeteElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private getherUserInput(): [string, string, number] | void {
    const entredTitle = this.titleInputElement.value;
    const entredDescription = this.descriptionInputElement.value;
    const entredPeople = this.peopleInputElement.value;

    if (
      entredTitle.trim().length === 0 ||
      entredDescription.trim().length === 0 ||
      entredPeople.trim().length === 0
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [entredTitle, entredDescription, +entredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
    this.clearInput();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
