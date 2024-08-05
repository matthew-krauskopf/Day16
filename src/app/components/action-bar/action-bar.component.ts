import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';
import { Message } from '../../features/message/message.entity';
import { UserFacade } from '../../features/user/user.facade';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgStyle, CommonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss',
})
export class ActionBarComponent {
  userFacade: UserFacade = inject(UserFacade);

  user$ = this.userFacade.user$;
  @Input() message?: Message;
  @Output() likeEmitter: EventEmitter<void> = new EventEmitter();

  isLiked: Observable<boolean> = this.user$.pipe(
    map((u) => {
      return (
        u != null &&
        this.message != null &&
        u.likedMessages.includes(this.message.uuid)
      );
    })
  );

  addComment($event: Event) {
    $event.stopPropagation();
  }

  addRepost($event: Event) {
    $event.stopPropagation();
  }

  toggleLike($event: Event) {
    $event.stopPropagation();
    this.likeEmitter.emit();
  }
}
