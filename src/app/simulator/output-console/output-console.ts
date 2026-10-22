import { Component, input } from '@angular/core';
import { ConsoleEvent } from '../simulation-manager';



@Component({
  selector: 'app-output-console',
  imports: [],
  templateUrl: './output-console.html',
  styleUrl: './output-console.scss',
})
export class OutputConsole {
    console = input.required<ConsoleEvent[]>();

    isErr(event: ConsoleEvent): boolean {
        return event.type == 'err';
    }
}
