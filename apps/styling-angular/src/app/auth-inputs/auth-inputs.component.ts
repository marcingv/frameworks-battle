import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabeledInputComponent } from '../labeled-input/labeled-input.component';
import { ButtonDirective } from '../button/button.directive';

@Component({
  selector: 'app-auth-inputs',
  standalone: true,
  imports: [
    CommonModule,
    LabeledInputComponent,
    ReactiveFormsModule,
    ButtonDirective,
  ],
  templateUrl: './auth-inputs.component.html',
  styleUrl: './auth-inputs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthInputsComponent {
  public emailCtrl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordCtrl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  protected submit(): void {
    this.emailCtrl.markAsDirty();
    this.passwordCtrl.markAsDirty();
  }
}
