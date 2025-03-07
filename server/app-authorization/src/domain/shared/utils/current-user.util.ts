import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuditableEntity } from '../global-dto/auditable.entity';
import { PayloadDto } from '../global-dto/payload.dto';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserUtil {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user(): PayloadDto {
    return this.request['user'];
  }

  get user_id(): number {
    return (this.request['user'] as PayloadDto)?.id;
  }

  public audit(set: SetAutitEnum = SetAutitEnum.NEW): Partial<AuditableEntity> {
    switch (set) {
      case SetAutitEnum.NEW:
        return { creado_por: this.user_id };
      case SetAutitEnum.UPDATE:
        return { actualizado_por: this.user_id };
      case SetAutitEnum.BOTH:
        return { creado_por: this.user_id, actualizado_por: this.user_id };
    }
  }
}

export enum SetAutitEnum {
  NEW,
  UPDATE,
  BOTH,
}
