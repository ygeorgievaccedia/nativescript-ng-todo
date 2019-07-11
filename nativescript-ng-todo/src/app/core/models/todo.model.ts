export type Project = "Inbox" | "Personal" | "Shopping" | "Work" | "Errands" | "Movies to watch";

export type Priority = 1 | 2 | 3 | 4;

export class Todo {
    constructor(
        public id: string,
        public createdOn: Date,
        public modifiedOn: Date,
        public title: string,
        public description: string,
        public isCompleted: boolean,
        public isFavourite: boolean,
        public completedOn: Date,
        public dueDate: Date,
        public priority: Priority,
        public parent: Todo,
        public project: Project,
        public labels: string[],
        public reminder: Date,
    ) {
        this.labels = [];
    }
}
