import { Component } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';

import { TodoService } from '~/app/core/services/todo.service';
import { Store } from '~/app/core/state/app-store';
import { Todo } from '~/app/core/models/todo.model';

@Component({
    selector: "ns-search-page",
    templateUrl: "./search-page.component.html",
    styleUrls: ["./search-page.component.scss"],
    moduleId: module.id
})
export class SearchPageComponent {
    public searchFilter: string;
    public todos$ = this.store.select<Todo[]>("searchedTodos");

    constructor(
        private readonly store: Store,
        private readonly todosService: TodoService,
        private readonly page: Page) {

        this.page.actionBarHidden = true;
        this.searchFilter = "";
    }

    public onSearchChange(args) {
        this.todosService.getFilteredTodos(args.value);
        this.searchFilter = args.value;
    }
    public onClearSearch() {
        this.onSearchChange("");
    }
}
