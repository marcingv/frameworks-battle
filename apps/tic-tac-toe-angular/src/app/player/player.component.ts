import {
  ChangeDetectionStrategy,
  Component,
  computed, HostBinding,
  input,
  InputSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  signal
} from '@angular/core';
import { PlayerSymbol } from "@gv-frameworks-battle/domain";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnChanges {
  public name: InputSignal<string> = input.required<string>();
  public symbol: InputSignal<PlayerSymbol> = input.required<PlayerSymbol>();

  public nameChanged: OutputEmitterRef<string> = output<string>();

  protected isEditing = signal<boolean>(false);
  protected buttonLabel = computed(() => this.isEditing() ? 'Save' : 'Edit');

  protected formControl = new FormControl<string>('');

  @HostBinding('style.display') private displayStyle = 'flex';

  public ngOnChanges(): void {
    this.formControl.setValue(this.name());
  }

  protected onEditClick(): void {
    if (this.isEditing()) {
      const newName = this.formControl.value ?? '';

      this.nameChanged.emit(newName);
    }

    this.isEditing.update((prev) => !prev);
  }
}
