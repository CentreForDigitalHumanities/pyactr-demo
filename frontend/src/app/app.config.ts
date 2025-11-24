import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import {
    provideHttpClient,
    withFetch,
    withXsrfConfiguration,
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withFetch(),
            withXsrfConfiguration({
                cookieName: "csrftoken",
                headerName: "X-CSRFToken",
            })
        ),
        { provide: APP_BASE_HREF, useValue: "/" },
    ],
};
