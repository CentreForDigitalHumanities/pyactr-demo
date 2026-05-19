import { Component, input } from '@angular/core';
import { ConsoleEvent } from '../simulation-manager';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-output-console',
  imports: [CommonModule],
  templateUrl: './output-console.html',
  styleUrl: './output-console.scss',
})
export class OutputConsole {
    console = input.required<ConsoleEvent[]>();

    isErr(event: ConsoleEvent): boolean {
        return event.type == 'err';
    }
}
