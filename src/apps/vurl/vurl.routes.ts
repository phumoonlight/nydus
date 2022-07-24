import { Routes } from '@nestjs/core';
import { AdminModule } from './core/admin/admin.module';
import { ImageModule } from './core/image/image.module';
import { LinkModule } from './core/link/link.module';
import { LinkGroupModule } from './core/linkgroup/linkgroup.module';

export const routes: Routes = [
  {
    path: 'api/vurl',
    children: [
      { path: 'admin', module: AdminModule },
      { path: 'images', module: ImageModule },
      { path: 'links', module: LinkModule },
      { path: 'linkgroups', module: LinkGroupModule },
    ],
  },
];
