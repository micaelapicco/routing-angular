import { Routes } from "@angular/router"
import { NoTaskComponent } from "./tasks/no-task/no-task.component"
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { routes as UserRoutes } from '../app/users/users.routes'
export const routes: Routes = [
        {
            path: '', // <domain>/
            component: NoTaskComponent,
            title: 'No Tasks Available'
        },        
        {
            path: 'users/:userId', // <domain>/users/u1
            component: UserTasksComponent,
            children: UserRoutes,
            data: {
                message: 'User Tasks Page'
            }
        },
        {
            path: '**', // wildcard route for a 404 page
            component: NotFoundComponent,
            title: 'Page Not Found'
        }
    ]