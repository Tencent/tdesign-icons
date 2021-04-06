import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, OnInit, Optional } from '@angular/core';

/**
 * Suppressed `strictMetadataEmit: true` error
 * https://github.com/angular/angular/issues/20351#issuecomment-344009887
 */
/** @dynamic */
@Injectable({
  providedIn: 'root',
})
/**
 * register icons, for usage with `type` property
 */
export class TIconService implements OnInit {
  private loadedUrls = new Set();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(ICON_SVG_URLS) private iconSvgUrls?: string[],
    @Optional() @Inject(ICONFONT_URLS) private iconfontUrls?: string[],
  ) {}

  ngOnInit(): void {
    this.iconSvgUrls?.forEach((url: string) => this.loadSvgIcon(url));
    this.iconfontUrls?.forEach((url: string) => this.loadIconfont(url));
  }

  public loadSvgIcon(iconUrl: string): void {
    if (this.loadedUrls.has(iconUrl)) {
      return;
    }
    this.loadedUrls.add(iconUrl);

    const script = this.document.createElement('script');
    script.src = iconUrl;
    this.document.body.appendChild(script);
  }

  public loadIconfont(iconUrl: string): void {
    if (this.loadedUrls.has(iconUrl)) {
      return;
    }
    this.loadedUrls.add(iconUrl);

    const link = this.document.createElement('link');
    link.href = iconUrl;
    link.rel = 'stylesheet';
    this.document.head.appendChild(link);
  }
}

export const ICON_SVG_URLS = new InjectionToken<string[]>('t-design-icon-svg-urls');
export const ICONFONT_URLS = new InjectionToken<string[]>('t-design-iconfont-urls');
