import { Component, input } from '@angular/core';
import { ConsoleEvent } from '../simulation-manager';
import { SharedModule } from '../../shared/shared-module';


@Component({
  selector: 'app-output-console',
  imports: [SharedModule],
  templateUrl: './output-console.html',
  styleUrl: './output-console.scss',
})
export class OutputConsole {
    console = input.required<ConsoleEvent[]>();
}
