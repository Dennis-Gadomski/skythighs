import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingCtrl: LoadingController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('skipLoading')) {
      return next.handle(req);
    }

    if (this.activeRequests === 0) {
      this.showLoading();
    }

    this.activeRequests++;

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.hideLoading();
        }
      })
    );
  }

  private async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'loading data',
    });
    await loading.present();
  }

  private async hideLoading() {
    await this.loadingCtrl.dismiss();
  }
}