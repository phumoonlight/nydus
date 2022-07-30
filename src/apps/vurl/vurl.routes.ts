import { Routes } from '@nestjs/core';
// import { UserModule } from './core/user/user.module';
import { ImageModule } from './core/image/image.module';
import { LinkModule } from './core/link/link.module';
import { LinkGroupModule } from './core/linkgroup/linkgroup.module';

export const routes: Routes = [
  {
    path: 'api/vurl',
    children: [
      // { path: 'users', module: UserModule },
      { path: 'images', module: ImageModule },
      { path: 'links', module: LinkModule },
      { path: 'linkgroups', module: LinkGroupModule },
    ],
  },
  {
    path: 'api/vurl/admin',
    children: [],
  },
];
