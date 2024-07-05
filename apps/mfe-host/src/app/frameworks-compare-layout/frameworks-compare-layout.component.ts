import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-frameworks-compare-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './frameworks-compare-layout.component.html',
  styleUrl: './frameworks-compare-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworksCompareLayoutComponent {}
