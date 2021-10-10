## Folder structure
```bash

├───app
│   ├───components
│   │   ├───add-box
│   │   ├───add-item
│   │   ├───box-detail
│   │   ├───boxes-list
│   │   ├───boxes-list-item
│   │   ├───damage-modal
│   │   ├───delete-item
│   │   ├───item-detail
│   │   ├───item-functional
│   │   ├───item-repair
│   │   ├───item-repair-all
│   │   ├───item-report
│   │   ├───items-list
│   │   ├───log-in
│   │   ├───navbar
│   │   ├───scan
│   │   ├───update-item
│   │   └───user-details
│   │
│   ├───guards
│   │       auth.guard.spec.ts
│   │       auth.guard.ts
│   │       master.guard.spec.ts
│   │       master.guard.ts
│   │
│   ├───interceptors
│   │       auth.interceptor.spec.ts
│   │       auth.interceptor.ts
│   │
│   └───services
│           auth.service.spec.ts
│           auth.service.ts
│           boxes-service.service.spec.ts
│           boxes-service.service.ts
│           items.service.spec.ts
│           items.service.ts
│           qr-code.service.spec.ts
│           qr-code.service.ts
│           report.service.spec.ts
│           report.service.ts
│           user.service.spec.ts
│           user.service.ts
│
├───assets
│       .gitkeep
│
├───environments
│       environment.prod.ts
│       environment.ts
│
├───global
│       globals.ts
│       qrCode.ts
│
└───models
        AuthRequest.ts
        box.ts
        items.ts
        itemWithBoxName.ts
        report.ts
        user.ts
```

